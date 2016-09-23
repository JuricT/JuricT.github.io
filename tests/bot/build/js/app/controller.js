define(
  'controller',
  ['message', 'model'],
  function(Message) {
    'use strict';

    function Controller (model, view, bot) {
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

      //Disabled focus "smile" button
      view.sendBtn.getTarget().attr({
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
        var message = new Message('User', textInner.html(), 'user');

        textInner.clear();

        model.addMessage(message);
        win.addMessage(model.messages[model.messages.length - 1]);

        bot.sendMessage(message, model, win);

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
