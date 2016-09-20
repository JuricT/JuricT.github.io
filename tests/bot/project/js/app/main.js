define(
  ['model',
   'view',
   'controller',
   'lib/jquery'],
  function(Model, View, Controller) {
    'use strict';

    $(function() {
      var model = new Model();
      var view = new View(model);
      var controller = new Controller(model, view);
    });
  }
);
