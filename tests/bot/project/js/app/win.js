define(
  'win',
  ['template', 'jquery'],
  function (Template) {
    'use strict';

    function Win(wrapper, messages) {
      this.messages = messages;

      this.$wrapper = wrapper.fadeTo(0, 1).hide();

      this.$chat = this.$wrapper.find('.chat');

      this._template = new Template('#chat-template', this.$chat);

      this._$tempMessage = $(document.createElement('div'));
      this._messageTemplate = new Template('#chat-template', this._$tempMessage);
    }

    Win.prototype.render = function () {
      this._template.render(this.messages);
    };

    Win.prototype.addMessage = function (message) {
      var data = new Array(message);
      this._messageTemplate.render(data);
      this.$chat.append(this._$tempMessage.html());
    };

    Win.prototype.refreshPosition = function () {
      var multiplier = 3;

      var windowWith = document.documentElement.clientWidth;
      var windiwHeight = document.documentElement.clientHeight;

      var winHight = windiwHeight / multiplier;
      var winWidth = windowWith / multiplier;

      this.$wrapper
      .width(winWidth).height(winHight)
      .offset({
        left: ((windowWith - winWidth) / 2),
        top: ((windiwHeight - winHight) / 2)
      });
    };

    Win.prototype.show = function () {
      this.render();
      this.$wrapper.show();
      this.refreshPosition();
    };

    Win.prototype.hide = function () {
      this.$wrapper.hide();
    };

    return Win;
  }
);
