define(
  'view',
  ['button', 'win', 'smiles', 'smile', 'model', 'jquery', 'textContainer'],
  function (Btn, Win, Smiles, Smile) {
    'use strict';

    function View(model) {
      var that = this;
      this._model = model;

      this.elements = {
        chatBtn: $('.chat-btn'),
        smileBtn: $('.btn--smile'),
        sendBtn: $('.btn--send'),
        control: $('.control'),
        smiles: $('.smiles'),
        textInner: $('.text-inner').textContainer()
      };

      this.chatBtn = new Btn({
          states: [
            {
              title: 'Открыть',
              styled: 'primary'
            },
            {
              title: 'Закрыть',
              styled: 'warning'
            }
          ],

          elements: {
            target: this.elements.chatBtn
          }
      });


      this.smileBtn = new Btn({
        states: [
          {
            title: ''// '<div class="smile smile--smiling"></div>'
          }
        ],
        elements: {
          target: this.elements.smileBtn,
          parent: this.elements.control
        }
      });

      this.sendBtn = new Btn({
        states: [
          {
            title: ''//'<div class="smile smile--send"></div>'
          }
        ],
        elements: {
          target: this.elements.sendBtn,
          parent: this.elements.control
        }
      });

        this.smiles = new Smiles(this.elements.smiles);
        this.smiles.add(new Smile('smiling'));
        this.smiles.add(new Smile('happy'));
        this.smiles.add(new Smile('confused'));
        this.smiles.add(new Smile('sad'));
        this.smiles.render();

      this.win = new Win($('#modal'), model.messages);

    }

    return View;
  }
);
