import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SimpleModal from "./components/SimpleModal";
import './assets/modspage.css';

function ModsPage(){

    const navigate = useNavigate();
    const [ modsData, setModsData ] = useState();
    const [ searchData, setSearchData ] = useState('');

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ clickedItem, setClickedItem ] = useState();

    useEffect(() => {
        fetch('https://api.warframestat.us/mods')
        .then(response => response.json())
        .then(data => setModsData(data))
        .catch(error => console.log(error));
    },[]);

    const search = (event) => {
        setSearchData(event.target.value);
    }

    const handleClickingDiv = (item) => {
        setClickedItem(item);
        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return(
        <div>
            <nav className="stickyNavbar">
                <input type='text' name="query" onChange={search} value={searchData}/>
                <button onClick={() => navigate("/wishlist")}>Wishlist</button>
                <button onClick={() => navigate("/search")}>Items</button>
                <button onClick={() => navigate("/")}>Home</button>
            </nav>

            <h1>Mods Page</h1>

            <div className="mods-container">
                {modsData && modsData
                    .filter(mod => mod.type !== 'Focus Way')
                    .filter(mod => mod.name != 'Unfused Artifact')
                    .filter(mod => mod.drops)
                    .filter(mod => mod.name.toLowerCase().includes(searchData.toLowerCase()))
                    .map(mod => {
                        return (
                            <div>
                                <div key={mod.uniqueName} className="mods-containeritem" onClick={() => handleClickingDiv(mod)}>
                                    <img src={mod.wikiaThumbnail ? mod.wikiaThumbnail.split('revision')[0] : null} alt={mod.name} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        <SimpleModal 
            isOpen={isModalOpen} 
            onClose={closeModal}
            setClickedItem={setClickedItem}
            title={clickedItem ? clickedItem.name : ''}
            data={clickedItem ? clickedItem.drops : ''} 
            type='mod'
        />

        </div>
    )
}
export default ModsPage;