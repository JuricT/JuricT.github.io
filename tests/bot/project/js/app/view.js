define(
  'view',
  ['button', 'win', 'model', 'jquery'],
  function (Btn, Win) {
    'use strict';

    function View(model) {
      var that = this;
      this._model = model;

      this.elements = {

      };

      this.chatBtn = new Btn({
          states: [
            {
              title: 'Открыть',
            },
            {
              title: 'Закрыть',
            }
          ],

          elements: {
            target: $('.chat-btn')
          }
        });

      this.smileBtn = new Btn({
        states: [
          {
            title: '<div class="smile smile--smiling"></div>'
          }
        ],

        elements: {
          target: $('.smile-btn')
        }
      });

      this.win = new Win();

    }

    return View;
  }
);
