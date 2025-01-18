import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import SimpleModal from "./components/SimpleModal";

function Wishlist(){

  const { wishlist, setWishlist } = useOutletContext();

  const [ searchData, setSearchData ] = useState('');
  const [ searchCategory, setSearchCategory ] = useState();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ clickedItem, setClickedItem ] = useState();
  

  const navigate = useNavigate();
  const handleSearchClick = () => {
    navigate('/');
  };

  const removeFromWishlist = (item) => {
    const newWishlist = wishlist.filter(wish => wish.name !== item.name);
    setWishlist(newWishlist);
  };

  const search = (event) => {
    setSearchData(event.target.value);
  };

  const filter = (filter) => {
    if(searchCategory === filter){
      setSearchCategory();
    }
    else setSearchCategory(filter)
  };

  const handleClickingDiv = (item) => {
    setClickedItem(item);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWishlist(wishlist.map(item => item.name === clickedItem.name ? clickedItem : item));
    setIsModalOpen(false);
  };
  
  return(
    <>
      <nav className="stickyNavbar">
        <input type='text' name="query" onChange={search} value={searchData}/>
        <button onClick={() => filter('Primary')}>Primary</button>
        <button onClick={() => filter('Secondary')}>Secondary</button>
        <button onClick={() => filter('Melee')}>Melee</button>
        <button onClick={() => filter('Warframes')}>Warframes</button>
        <button onClick={handleSearchClick}>SEARCH</button>
      </nav>
      <div>
        <h1>Wishlist</h1>
      </div>

      <div className="gridContainer">
        {wishlist.sort((a, b) => {
            const nameA = a.category.toUpperCase(); // ignore upper and lowercase
            const nameB = b.category.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
        }).filter(item => searchCategory ? item.category.toLowerCase() === searchCategory.toLowerCase() : item)
        .filter(item => item.name.toLowerCase().includes(searchData.toLowerCase()))
        .map(item => {
          return(
            <div key={item.name+Math.random()} className="clickablegridItem" onClick={() => handleClickingDiv(item)}>
              <div className="content">
                {item.name}
                <p>{item.components.filter(i => i.done).length +' / '+item.components.length}</p>
                <img src={item.wikiaThumbnail ? item.wikiaThumbnail.split('revision')[0] : null}/>
              </div>
              <button onClick={() => removeFromWishlist(item)}>Remove</button>
            </div>
          )
        })}
      </div>

      <SimpleModal isOpen={isModalOpen} onClose={closeModal}
      clickedItem={clickedItem ? clickedItem : ''} 
      setClickedItem={setClickedItem}
      title={clickedItem ? clickedItem.name : ''}
      data={clickedItem ? clickedItem.components : ''} 
      />

    </>
  )
}
export default Wishlist;

