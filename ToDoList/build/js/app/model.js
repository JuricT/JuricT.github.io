define('model', [], function () {

  const localStorageDataKey = 'TodoListData';

  class Model {

    constructor() {
      this.data = this.loadList();
    }

    saveList() {
      var dataJSON;
      var lsKey = localStorageDataKey;

      dataJSON = JSON.stringify(this.data);
      localStorage[lsKey] = dataJSON;
    }

    loadList() {
      var lsKey = localStorageDataKey;
      var dataJSON = localStorage[lsKey];

      if (!dataJSON) {
        return [];
      }

      return this.data = JSON.parse(dataJSON);
    }

    addItem(item) {
      if (item.length === 0) return this.data;
      this.data.push({ text: item, status: false });
      this.saveList();
      return this.data;
    }

    changeItem(index, text) {
      this.data[index] = { text: text, status: false };
      this.saveList();
    }

    removeItem(index) {
      if (index < 0) return this.data;
      this.data.splice(index, 1);
      this.saveList();
      return this.data;
    }
  } // class Model

  return Model;
} //define function
); // define

// try {
//   module.export = Model;
// } catch (e) {}