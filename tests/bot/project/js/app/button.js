define(
  'button',
  ['jquery'],
  function () {
    'use strict';

    function Btn(config) {
      var that = this;

      var defaultTarget = $('.chat-btn');

      var defaultSettings = {
        states: [
          {
            title: 'Open',
            callback: null
          },
          {
            title: 'Close',
            callback: null
          },
        ],

        elements: {
          target: defaultTarget,
          // parent: defaultTarget.parent()
        }
      };

      var options = $.extend(defaultSettings, config);

      this._elements = {
        target: options.elements.target,
        // parent: options.elements.parent
      };

      this._currenState = 0;

      this.states = options.states;

      this.initClick();
      this.initState();
    }

    Btn.prototype.getTarget = function () {
      return this._elements.target;
    };

    Btn.prototype.initClick = function(callbck) {
      var that = this;

      if ('parent' in (this._elements || {})){
        this._elements.parent.on('click', callback);
      } else {
        this._elements.target.on('click', callback);
      }

      function callback(e) {
        if (that._elements.target[0] === e.target) {
          var $target = $(e.target);

          if ($.isFunction(callbck)) {
            callbck();
          }

          if ($.isFunction(that.states[that._currenState].callback)) {
            that.states[that._currenState].callback();
          }

          that.nextState();
        }
      }
    };

    Btn.prototype.initState = function () {
      this._elements.target.text(this.states[this._currenState].title);
    };

    Btn.prototype.nextState = function () {
      this._incState();
      this.initState();
    };

    Btn.prototype._incState = function () {
      this._currenState = (this._currenState < this.states.length - 1) ?
      ++this._currenState : 0;
    };

    return Btn;
  }
);
