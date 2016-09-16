define(
  'app/model',
  ['lodash'],
  function (store) {
    function Model() {
      // this._data = this.loadList();
      // this._data = store.getLocalStorage();
      this._data = [
        {
          id: 1,
          text: 'lorem isum',
          date: new Date()
        },
        {
          id: 2,
          text: 'lorem isum 2',
          date: new Date(2016, 1, 2, 3, 4, 5)
        },
        {
          id: 3,
          text: 'lorem isum 2',
          date: new Date(2011, 0, 1, 2, 3, 4)
        },
        {
          id: 4,
          text: 'lorem isum',
          date: new Date()
        }
      ];

      this._data = this.sortedByDate();
    }

    Model.prototype.saveList = function() {
      store.setLocalStorage();
    };

    Model.prototype.loadList = function() {
      this._data = store.setLocalStorage();
    };

    Model.prototype.addItem = function(item) {
      if (!item.date || !item.date.getTime) return;

      this._data.push(inem);

      store.setLocalStorage(this.sortedByDate());
    };

    Model.prototype.removeItem = function (id) {
      if (!id) return ;

      for (var i = 0; i < this._data.length; i++) {
        if (this._data[i].id === id) {
          this._data.splice(i, 1);
          break;
        }
      }

      store.setLocalStorage(this._data);
    };

    Model.prototype.sortedByDate = function() {
      return _.orderBy(this._data, 'date', 'desc');
    };

    return Model;
  }
);


try {
  module.exports = Model;
} catch (e) {}
