define(
  'app/model',
  ['app/store', 'lodash'],
  function () {
    function Model(store) {
      this._store = store;
      this.loadData();
    }

    Model.prototype.saveData = function() {
      this._store.setLocalStorage(this.data);
    };

    Model.prototype.loadData = function() {
      var data = this._store.getLocalStorage();
      data.noteList = this.sortedByDate(data.noteList);
      this.data = data;
    };

    Model.prototype.addSortList = function(sortList) {
      this.data.sortList = sortList;
      this.saveData();
    };

    Model.prototype.getSortList = function() {
      return this.data.sortList;
    };

    Model.prototype.addItem = function(item) {
      this.data.noteList.push(item);
      this.data.noteList = this.sortedByDate(this.data.noteList);
      this._store.setLocalStorage(this.data, this);
    };

    Model.prototype.removeItem = function (id) {
      if (!id) return ;

      var noteList = this.data.noteList;

      for (var i = 0; i < noteList.length; i++) {
        if (noteList[i].id === id) {
          noteList.splice(i, 1);
          break;
        }
      }

      this._store.setLocalStorage(this.data);
    };

    Model.prototype.sortedByDate = function(data) {
      return _.orderBy(data, 'date', 'desc');
    };

    return Model;
  }
);


try {
  module.exports = Model;
} catch (e) {}
