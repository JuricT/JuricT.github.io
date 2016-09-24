define(
  'model',
  ['message'],
  function (Message) {
    'use strict';

    function Model() {
      this.messages = [];
      return this;
    }

    Model.prototype.addMessage = function (message) {
      this.messages.push(message);
      return this;
    };

    return Model;
  }
);
