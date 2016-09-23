define(
  'win',
  ['template', 'jquery'],
  function (Template) {
    'use strict';

    function Win(wrapper) {
      // this.$wrapper = $('<div>').addClass('win').hide().appendTo('body');

      this.$wrapper = wrapper.fadeTo(0, 1).hide();

      var $chat = this.$wrapper.find('.chat');

      this._template = new Template('#chat-template', $chat);
    }

    Win.prototype.render = function () {
      this._template.render();
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
