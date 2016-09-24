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
            callback: null,
          },
          {
            title: 'Close',
            callback: null,
          },
        ],

        elements: {
          target: defaultTarget,
        }
      };

      var options = $.extend(defaultSettings, config);

      this._elements = options.elements;

      this._currenState = 0;

      this.states = options.states;

      this.initClick();
      this.initState();

      return this;
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
        var $target = $(e.target);
        if ((that._elements.target[0] === e.target) ||
     that._elements.target[0] === $target.closest(that._elements.target[0])[0]){

          if ($.isFunction(callbck)) {
            callbck();
          }

          if ($.isFunction(that.states[that._currenState].callback)) {
            that.states[that._currenState].callback();
          }

          that.nextState();
        }
      }

      return this;
    };

    Btn.prototype.initState = function () {
      var terget = this._elements.target;
      var thisState = this.states[this._currenState];

      terget.html(thisState.title);

      var buttonClasses = [
        'btn-default', 'btn-primary', 'btn-success', 'btn-info', 'btn-warning',
        'btn-danger', 'btn-link'
       ];

       for (var i = 0; i < buttonClasses.length; i++) {
         terget.removeClass(buttonClasses[i]);
       }


      if (thisState.styled) {
        terget.addClass('btn-' + thisState.styled);
      } else {
        terget.addClass('btn-default');
      }

      return this;
    };

    Btn.prototype.nextState = function () {
      this._incState();
      this.initState();

      return this;
    };

    Btn.prototype._incState = function () {
      this._currenState = (this._currenState < this.states.length - 1) ?
      ++this._currenState : 0;

      return this;
    };

    Btn.prototype.checkClick = function (e) {
      var $target = $(e.target);
      var $elem = this._elements.target;

      return (($elem[0] === e.target) ||
               $elem[0] === $target.closest($elem[0])[0]);
    };

    return Btn;
  }
);
