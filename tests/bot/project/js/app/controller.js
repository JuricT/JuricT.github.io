define(
  'controller',
  ['model', 'view'],
  function() {
    'use strict';

    function Controller (model, view) {
      var that = this;
      that._model = model;
      that._view = view;

      view.chatBtn.states[0].callback = function() {
        view.win.show();
      };

      view.chatBtn.states[1].callback = function() {
        view.win.hide();
      };

      $(window).resize(function(e) {
        if (view.win.$wrapper.is(':visible')) view.win.refreshPosition();
      });

    }

  return Controller;
  }
);
