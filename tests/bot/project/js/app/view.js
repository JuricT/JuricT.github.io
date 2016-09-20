define(
  'view',
  ['model', 'jquery'],
  function () {
    'use strict';

    function View(model) {
      var that = this;
      this._model = model;

      this.elements = {
      };

    }

    return View;
  }
);
