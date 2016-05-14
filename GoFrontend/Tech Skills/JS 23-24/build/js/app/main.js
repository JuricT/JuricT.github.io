define(['model', 'view', 'controller', '../lib/jquery'], function (Model, View, Controller) {
  $(() => {
    var model = new Model();
    var view = new View(model);
    var controller = new Controller(model, view);
  });
});