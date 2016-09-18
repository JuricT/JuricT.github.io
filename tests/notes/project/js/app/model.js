define(
  'app/model',
  ['app/store', 'lodash'],
  function () {
    function Model(store) {
      this._store = store;
      this.data = store.getLocalStorage();
      this.data = this.sortedByDate(this.data);
    }

    Model.prototype.saveList = function() {
      this._store.setLocalStorage();
    };

    Model.prototype.loadList = function() {
      this.data = this._store.getLocalStorage();
    };

    Model.prototype.addItem = function(item) {
      var data;

      this.data.push(item);
      this.data = this.sortedByDate(this.data);

      this._store.setLocalStorage(this.data);
    };

    Model.prototype.removeItem = function (id) {
      if (!id) return ;

      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].id === id) {
          this.data.splice(i, 1);
          break;
        }
      }

<<<<<<< HEAD
        dateToStr (date = new Date()) {
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          var hour = date.getHours();
          var min = date.getMinutes();

          return `${day}.${month}.${year} ${hour}:${min}`;
        }

        get listNodes () {
          return ['node1', 'node2'];
        }

      }
=======
      this._store.setLocalStorage(this.data);
    };

    Model.prototype.sortedByDate = function(data) {
      return _.orderBy(data, 'date', 'desc');
    };
>>>>>>> td

    return Model;
  }
);


try {
  module.exports = Model;
} catch (e) {}
