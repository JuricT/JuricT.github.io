define(
  'bot',
  ['message', 'jquery'],
  function (Message) {
    'use strict';

    function Bot(name) {
      var that = this;

      this.name = name;

      this.dummy = [
        {
          in: ['привет', 'здравствуйте', 'добрый день', 'добрый вечер'],
          out: 'Здравствуйте, UserNeme!'
        },
        {
          in: ['не приходят данные', 'не приходят таблицы'],
          out: 'Нам известно од этой проблеме и сейчас администраторы занимаются ее решением.'
        },
        {
          in: ['пока', 'досвидания'],
          out: 'Ну Вы там держитесь, всего Вам доброго, хорошего настроения и здоровья!'
        }
      ];

      return this;
    }

    Bot.prototype.sendMessage = function (message, model, win) {
      this.setUserMessage(message);
      if ( this.createMessage() ) {
        model.addMessage(this.message);
        win.addMessage(model.messages[model.messages.length - 1]);
      }
      return this;
    };

    Bot.prototype.createMessage = function () {
      var userName = this._userMassege.name;
      var userText = this._userMassege.text.toLowerCase();
      var dummy = this.dummy;

      var textMessage = '';

      for (var i = 0; i < dummy.length; i++) {
        for (var j = 0; j < dummy[i].in.length; j++) {
          if (~userText.indexOf(dummy[i].in[j])){
            textMessage += dummy[i].out.replace('UserNeme', userName) + '<br>';
          }
        }
      }

      if (textMessage) {
        this.message = new Message(this.name, textMessage, 'bot');
        return this.message;
      }

      return null;
    };

    Bot.prototype.getMessage = function () {
      if (!this.message) return null;
      return this.message;
    };

    Bot.prototype.setUserMessage = function (message) {
      this._userMassege = message;
      return this;
    };

    return Bot;
  }
);
