define(
  'win',
  ['template', 'jquery'],
  function (Template) {
    'use strict';

    function Win(wrapper, messages) {
      this.messages = messages;

      this.$wrapper = wrapper.css({
        'top': '-9999px',
        'opacity': '0'
      });

      this.$chat = this.$wrapper.find('.chat');
      this.$textInner = this.$wrapper.find('.text-inner');

      this._template = new Template('#chat-template', this.$chat);

      this._$tempMessage = $(document.createElement('div'));
      this._messageTemplate = new Template('#chat-template', this._$tempMessage);

      return this;
    }

    Win.prototype.render = function () {
      this._template.render(this.messages);
      return this;
    };

    Win.prototype.addMessage = function (message) {
      var data = new Array(message);
      this._messageTemplate.render(data);
      this.$chat.append(this._$tempMessage.html());
      return this;
    };

    Win.prototype.refreshPosition = function () {
      var multiplier = 3;

      var windowWith = document.documentElement.clientWidth;
      var windiwHeight = document.documentElement.clientHeight;

      var winHight = windiwHeight / multiplier;
      var winWidth = windowWith / multiplier;

      var position = {
        left: ((windowWith - winWidth) / 2),
        top: ((windiwHeight - winHight) / 2)
      };

      this.$wrapper
      .width(winWidth).height(winHight)
      .offset(position);
      return this;
    };

    Win.prototype.show = function () {
      this.render();
      this.$wrapper.animate({opacity: 1}, 'slow');
      this.refreshPosition();
      return this;
    };

    Win.prototype.hide = function () {
      var that = this;
      this.$wrapper.animate({opacity: 0}, 'fast', function() {
        that.$wrapper.offset({left:-9999,top:-9999});
      });
      return this;
    };

    return Win;
  }
);
