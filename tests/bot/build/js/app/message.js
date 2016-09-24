define(
  'message',
  ['jquery'],
  function () {
    'use strict';

    function Message(name, text, type) {
      this.id = new Date();
      this.name = name;
      this.text = text;
      this.date = new Date();
      this.type = type;

      return this;
    }

    return Message;
  }
);
