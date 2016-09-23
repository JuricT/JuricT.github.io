define(
  'bot',
  ['message', 'jquery'],
  function (Message) {
    'use strict';

    function Bot(name) {
      var that = this;

      this.name = name;
    }

    Bot.prototype.sendMessage = function (message, model, win) {
      this.setUserMessage(message);
      this.createMessage();

      model.addMessage(this.message);
      win.addMessage(model.messages[model.messages.length - 1]);
    };

    Bot.prototype.createMessage = function () {
      this.message = new Message(this.name, 'som text', 'bot');
    };

    Bot.prototype.getMessage = function () {
      if (!this.message) return null;
      return this.message;
    };

    Bot.prototype.setUserMessage = function (message) {
      this._userMassege = message;
    };

    return Bot;
  }
);
