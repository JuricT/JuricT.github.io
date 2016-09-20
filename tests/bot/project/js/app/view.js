define(
  'view',
  ['buttons/chat_buttons', 'model', 'jquery', 'fancybox'],
  function (ChatBtn) {
    'use strict';

    function View(model) {
      var that = this;
      this._model = model;

      this.elements = {

      };

      this._chatBtn = new ChatBtn({
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

      $(".fancybox").fancybox();

    }

    return View;
  }
);
