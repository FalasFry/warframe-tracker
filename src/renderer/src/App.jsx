import { use, useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import FileOperations from "./components/FileOperations";

function App() {

  const [ allData, setAllData ] = useState();
  const [ wishlist, setWishlist ] = useState([]);

  useEffect(() => {
    let fileOp = new FileOperations();
    let loadWishlist;
    try{
       loadWishlist = fileOp.handleLoadData();
    }
    catch(error){
      try{
        fileOp.handleSaveData([]);
      }
      catch(error){
        console.error(error);
      }
    }
    setWishlist(loadWishlist);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const fileOp = new FileOperations();
      try {
        fileOp.handleSaveData(wishlist);
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [wishlist]);

  return (
    <> 
      <Outlet context={{allData, setAllData, wishlist, setWishlist}} />
    </>
  )
}

export default App;
