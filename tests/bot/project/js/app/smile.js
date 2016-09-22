define(
  'smile',
  ['jquery'],
  function () {
    'use strict';

    function Smile(name) {
      var that = this;
      var className = 'smile smile--' + name;
      var $elem = $(document.createElement("div")).addClass(className);

      $elem.on('click', function() {
        console.log(that.name);
      });

      this.name = name;
      this.$elem = $elem;
    }

    Smile.prototype.push = function ($parent) {
      $parent.append(this.$elem);
    };

    Smile.prototype.checkClick = function (e) {
      return ((this.$wrapper[0] === e.target) ||
              (this.$wrapper[0] === $(e.target).closest(this.$wrapper[0])[0]));
    };

    return Smile;
  }
);
