define(
  ['app/model',
   'app/view',
   'app/controller',
   'app/store',
   'app/filter',
   'app/hamburger',
   'jquery'],
  function(Model, View, Controller, Store, FilterByDate, Hamburger) {
    'use strict';

    $(function() {
      var store = new Store('notes');
      var model = new Model(store);
      var filter = new FilterByDate(model);
      var view = new View(model, filter);
      var controller = new Controller(model, view, filter);
      var hamburger = new Hamburger({
        menu: view.elements.filter,
        cross: $('.cross'),
        hamburger: $('.hamburger')
      });
    });
  }
);
