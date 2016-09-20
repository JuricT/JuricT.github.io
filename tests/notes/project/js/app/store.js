define(
  'app/store',
  [],
  function () {
    'use strict';

    function Store(storeName) {
      this._dbName = storeName;
    }

    Store.prototype.getLocalStorage = function() {
      return this._dbData || JSON.parse(localStorage[this._dbName] || '{}', function(key, value){
        if (key == 'date') return new Date(value);
        return value;
      });
    };

    Store.prototype.setLocalStorage = function(data) {
      localStorage[this._dbName] = JSON.stringify(this._dbData = data);
    };

    return Store;
  }
);
