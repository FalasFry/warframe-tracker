import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import FileOperations from "./components/FileOperations";

function App() {

  const [ allData, setAllData ] = useState([]);
  const [ wishlist, setWishlist ] = useState([]);

  useEffect(() => {
    let fileOp = new FileOperations();
    let loadWishlist;
    let loadAllData;
    try{
      loadWishlist = fileOp.handleLoadData("wishlist");
    }
    catch(error){
      try{
        fileOp.handleSaveData([], "wishlist");
      }
      catch(error){
        console.error(error);
      }
    }
    try{
      loadAllData = fileOp.handleLoadData("allData");
    }
    catch(error){
      try{
        fileOp.handleSaveData([], "allData");
      }
      catch(error){
        console.error(error);
      }
    }
    setAllData(loadAllData);
    setWishlist(loadWishlist);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const fileOp = new FileOperations();
      try {
        fileOp.handleSaveData(wishlist, "wishlist");
        fileOp.handleSaveData(allData, "allData");
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [wishlist, allData]);

  return (
    <> 
      <Outlet context={{allData, setAllData, wishlist, setWishlist}} />
    </>
  )
}

export default App;
