define(['app/model', 'app/view', 'app/controller', 'app/filter', 'jquery'], function (Model, View, Controller, Filter) {
  $(() => {
    var model = new Model();
    var view = new View(model);
    var controller = new Controller(model, view);
    var filter = new Filter();
  });
});