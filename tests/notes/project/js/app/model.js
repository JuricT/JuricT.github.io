define(
  'app/model',
  [],
  function () {

    const localStorageDataKey = 'TodoListData';

    class Model {

        constructor() {
          this.data = this.loadList();
        }

        saveList () {
          var dataJSON;
          var lsKey = localStorageDataKey;

          dataJSON = JSON.stringify(this.data);
          localStorage[lsKey] = dataJSON;
        }

        loadList() {
          var lsKey = localStorageDataKey;
          var dataJSON = localStorage[lsKey];

          if (!dataJSON) { return [];}

          this.data = JSON.parse(dataJSON);

          return this.data;
        }

        addItem (item) {
          if (item.length === 0) return this.data;

          this.data.push({text:item, status: true});
          this.saveList();

          return this.data;
        }

        changeItem(index, obj) {
          this.data[index] = obj;
          this.saveList();

          return this.data;
        }

        removeItem (index) {
          if (index < 0) return this.data;

          this.data.splice(index, 1);
          this.saveList();

          return this.data;
        }

        getDate (date = new Date()) {
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          var hour = date.getHours();
          var min = date.getMinutes();

          return `${day}.${month}.${year} ${hour}:${min}`;
        }
      }

    return Model;
  }
);


try {
  module.exports = Model;
} catch (e) {}
