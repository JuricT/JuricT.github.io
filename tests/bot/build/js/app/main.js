define(
  ['model',
   'view',
   'controller',
   'bot',
   'jquery'],
  function(Model, View, Controller, Bot) {
    'use strict';

    $(function() {
      var bot = new Bot('Bot');
      var model = new Model();
      var view = new View(model);
      var controller = new Controller(model, view, bot);
    });
  }
);
