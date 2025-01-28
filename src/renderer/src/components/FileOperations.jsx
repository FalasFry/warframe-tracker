class FileOperations{
    constructor(){
      this.directoryPath = 'wishlist';
    }
    handleSaveData(data, filename){
      const filePath = `${this.directoryPath}/${filename}.json`;
      window.api.saveDataToFile(data, this.directoryPath ,filePath);
    };
    handleLoadData(filename) {
      const filePath = `${this.directoryPath}/${filename}.json`
      return window.api.loadDataFromFile(filePath);
    };
};
  
export default FileOperations;