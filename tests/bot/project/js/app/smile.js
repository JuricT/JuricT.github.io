define(
  'smile',
  ['jquery'],
  function () {
    'use strict';

    function Smile(name) {
      var that = this;
      var className = 'smile smile--' + name;
      var $elem = $(document.createElement("div")).addClass(className);

      $elem.attr({
        rel: name,
        unselectable: 'on',
        onselectstart: 'return false;',
        onmousedown: 'return false;'
      });

      this.name = name;
      this.$elem = $elem;

      return this;
    }

    Smile.prototype.push = function ($parent) {
      $parent.append(this.$elem);
      return this;
    };

    Smile.prototype.checkClick = function (e) {
      return ((this.$wrapper[0] === e.target) ||
              (this.$wrapper[0] === $(e.target).closest(this.$wrapper[0])[0]));
    };

    return Smile;
  }
);
