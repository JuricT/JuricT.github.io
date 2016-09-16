define(
  'app/store',
  [],
  function () {
    function Store(storeName) {
      this._dbName = storeName;
    }

    Store.prototype.getLocalStorage = function() {
      return this._dbData || JSON.parse(localStorage[this._dbName] || '[]');
    };

    Store.prototype.setLocalStorage = function(data) {
      localStorage[this._dbName] = JSON.stringify(this._dbData = data);
    };

    return Store;
  }
);
