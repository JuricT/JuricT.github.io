define(
  'controller',
  ['model', 'view'],
  function() {
    'use strict';

    function Controller (model, view) {
      var that = this;
      that._model = model;
      that._view = view;

    }

  return Controller;
  }
);
