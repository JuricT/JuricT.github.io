define(
  ['app/model', 'app/view', 'app/controller', 'app/store', 'app/filter', 'jquery'],
  function(Model, View, Controller, Store, FilterByDate) {
    $(function() {
      var store = new Store('notes');
      var model = new Model(store);
      var filter = new FilterByDate(model);
      var view = new View(model, filter);
      var controller = new Controller(model, view, filter);
    });
  }
);
