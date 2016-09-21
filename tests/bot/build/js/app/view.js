define(
  'view',
  ['buttons/chat_buttons', 'win', 'model', 'jquery'],
  function (ChatBtn, Win) {
    'use strict';

    function View(model) {
      var that = this;
      this._model = model;

      this.elements = {

      };

      this.chatBtn = new ChatBtn({
          states: [
            {
              title: 'Открыть',
              callback: null
            },
            {
              title: 'Закрыть',
              callback: null
            },
          ],

          elements: {
            target: $('.chat-btn'),
            parent: $('header')
          }
        }
      );

      this.win = new Win();

    }

    return View;
  }
);
