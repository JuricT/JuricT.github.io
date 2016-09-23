define(
  'controller',
  ['model', 'view'],
  function() {
    'use strict';

    function Controller (model, view) {
      var that = this;
      that._model = model;
      that._view = view;

      var win = view.win;

      var textInner = view.elements.textInner;
      //Click "open" button
      view.chatBtn.states[0].callback = function() {
        win.show();
      };

      //Click "close" button
      view.chatBtn.states[1].callback = function() {
        win.hide();
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
        textInner.insertSmileAtCursor(name);
        view.smiles.hide();
      });

      //Click "send" button
      view.sendBtn.states[0].callback = function() {
        console.log('Send');
        model.addMessage('User', textInner.html(), 'user');
        win.addMessage(model.messages[model.messages.length - 1]);

      };


      $(window).on('click', function(e) {
        var $target = $(e.target);

        if (!(view.smiles.checkClick(e) || view.smileBtn.checkClick(e))) {
          view.smiles.hide();
        }
      });

      $(window).resize(function(e) {
        if (win.$wrapper.is(':visible')) win.refreshPosition();
      });

    }

  return Controller;
  }
);
