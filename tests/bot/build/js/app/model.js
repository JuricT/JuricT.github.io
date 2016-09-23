define(
  'model',
  [],
  function () {
    'use strict';

    function Model() {
      this.messages = [];

    }

    Model.prototype.addMessage = function (name, text, type) {
      this.messages.push({
        id: new Date(),
        name: name,
        text: text,
        date: new Date(),
        type: type
      });

    };

    return Model;
  }
);
