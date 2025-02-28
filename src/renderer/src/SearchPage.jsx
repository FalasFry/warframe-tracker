import { use, useEffect, useState } from "react"
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import FileOperations from "./components/FileOperations";

function SearchPage(){

  const [ searchData, setSearchData ] = useState('');
  const [ searchCategory, setSearchCategory ] = useState();

  const { wishlist, setWishlist } = useOutletContext();

  const [ warframeData, setWarframeData ] = useState();
  const [ weaponsData, setwWeaponsData ] = useState();


  const navigate = useNavigate();

  const primary = [];
  const secondary = [];
  const melee = [];
  const warframes = [];
  const archwings = [];
  const mechSuit = [];

  const usefullData = [];

  
  useEffect(() => {
    fetch('https://api.warframestat.us/warframes/')
    .then(response => response.json())
    .then(data => setWarframeData(data))
    .catch(error => console.log(error));

    fetch('https://api.warframestat.us/weapons/')
    .then(response => response.json())
    .then(data => setwWeaponsData(data))
    .catch(error => console.log(error));

  }, [])
  

  if(warframeData){
    for(let i = 0; i < warframeData.length; i++){
      let tmpItem = warframeData[i];
      let prodCat = tmpItem.productCategory;
      
      switch(prodCat){
        case 'SpaceSuits': 
          tmpItem.category = 'Archwings';
          archwings.push(tmpItem); 
          break;
        case 'Suits': 
          tmpItem.category = 'Warframes';
          warframes.push(tmpItem);
          break;
        case 'MechSuits': 
          tmpItem.category = 'Nechramechs';
          mechSuit.push(tmpItem); 
          break;
        default: break;
      }
    }
  }
  if(weaponsData){
    for(let i = 0; i < weaponsData.length; i++){
      let tmpItem = weaponsData[i];
      let regularCat = tmpItem.category;
      switch(regularCat){
        case 'Primary': 
          tmpItem.category = 'Primary';
          primary.push(tmpItem); 
          break;
        case 'Secondary': 
          tmpItem.category = 'Secondary';
          secondary.push(tmpItem); 
          break;
        case 'Melee': 
          tmpItem.category = 'Melee';
          melee.push(tmpItem); 
          break;
        default: break;
      }
    }
  }
  warframes.forEach(item => usefullData.push(item));
  mechSuit.forEach(item => usefullData.push(item));
  archwings.forEach(item => usefullData.push(item));
  primary.forEach(item => usefullData.push(item));
  secondary.forEach(item => usefullData.push(item));
  melee.forEach(item => usefullData.push(item));
  

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  const search = (event) => {
    setSearchData(event.target.value);
  }

  const filter = (filter) => {
    if(searchCategory === filter){
      setSearchCategory();
    }
    else setSearchCategory(filter)
  }

  const addToWishlist = (item) => {
    setWishlist([...wishlist, item]);
  }

  return (
    <>
      <nav className="stickyNavbar">
          <input type='text' name="query" onChange={search} value={searchData}/>
          <button onClick={() => filter('Primary')}>Primary</button>
          <button onClick={() => filter('Secondary')}>Secondary</button>
          <button onClick={() => filter('Melee')}>Melee</button>
          <button onClick={() => filter('Warframes')}>Warframes</button>
          <button onClick={handleWishlistClick}>WISHLIST</button>
          <button onClick={() => navigate("/")}>Home</button>
      </nav>
      <div>
        <h1>Search</h1>
      </div>
      <div className="gridContainer">
        {usefullData && usefullData.filter(item => searchCategory ? item.category.toLowerCase() === searchCategory.toLowerCase() : item)
        .filter(item => item.name.toLowerCase().includes(searchData.toLowerCase())).map(item => {
          return(
            <div key={item.name+Math.random()} className="gridItem">
              <div className="content">
                {item.name}
                <p>{item.category}</p>
                <img src={item.wikiaThumbnail ? item.wikiaThumbnail.split('revision')[0] : null}/>
              </div>
              {wishlist.includes(item) ? '' : <button onClick={() => addToWishlist(item)}>Add To Wishlist</button>}
            </div>
          )
        })}
      </div>
    </>
  )
}
export default SearchPage;