define(
  ['app/model', 'app/view', 'app/controller', 'app/store', 'app/filter', 'jquery'],
  function(Model, View, Controller, Store, Filter) {
    $(function() {
      var store = new Store('notes');
      var model = new Model(store);
      var view = new View(model);
      var controller = new Controller(model, view);
      var filter = new Filter();
    });
  }
);
