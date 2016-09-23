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

      //Click "smile" button
      view.smileBtn.states[0].callback = function() {
        view.smiles.show();
      };

      //Disabled focus "smile" button
      view.smileBtn.getTarget().attr({
        unselectable: 'on',
        onselectstart: 'return false;',
        onmousedown: 'return false;'
      });

      // Click on smile
      view.smiles.$wrapper.on('click', function (e) {
        var name = $(e.target).attr('rel');
        view.elements.textInner.insertSmileAtCursor(name);
        view.smiles.hide();
      });

      //Click "send" button
      view.sendBtn.states[0].callback = function() {
        console.log('Send');
      };


      $(window).on('click', function(e) {
        var $target = $(e.target);

        if (!(view.smiles.checkClick(e) || view.smileBtn.checkClick(e))) {
          view.smiles.hide();
        }
      });

      $(window).resize(function(e) {
        if (view.win.$wrapper.is(':visible')) view.win.refreshPosition();
      });

    }

  return Controller;
  }
);
