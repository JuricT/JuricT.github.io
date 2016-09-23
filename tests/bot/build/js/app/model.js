define(
  'model',
  ['message'],
  function (Message) {
    'use strict';

    function Model() {
      this.messages = [];

    }

    Model.prototype.addMessage = function (message) {
      this.messages.push(message);
    };

    return Model;
  }
);
