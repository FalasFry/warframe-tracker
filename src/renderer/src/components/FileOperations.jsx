class FileOperations{
    constructor(){
      this.directoryPath = 'wishlist';
    }
    handleSaveData(wishlist){
      const filePath = `${this.directoryPath}/wishlist.json`;
      window.api.saveDataToFile(wishlist, this.directoryPath ,filePath);
    };
    handleLoadData() {
      const filePath = `${this.directoryPath}/wishlist.json`
      return window.api.loadDataFromFile(filePath);
    };
};
  
export default FileOperations;