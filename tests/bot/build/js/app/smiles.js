define(
  'smiles',
  ['jquery'],
  function () {
    'use strict';

    function Smiles(elem) {
      var that = this;
      
      this.$wrapper = elem;
      this.$wrapper.fadeTo(0, 1).hide()
      .attr({
        unselectable: 'on',
        onselectstart: 'return false;',
        onmousedown: 'return false;'
      });

      this.arr = [];
      return this;
    }

    Smiles.prototype.show = function () {
      this.$wrapper.show();
      return this;
    };

    Smiles.prototype.hide = function () {
      this.$wrapper.hide();
      return this;
    };

    Smiles.prototype.add = function (smile) {
      this.arr.push(smile);
      return this;
    };

    Smiles.prototype.render = function () {
      var $box = this.$wrapper.empty();

      for (var i = 0; i < this.arr.length; i++) {
        $box.append(this.arr[i].$elem);
      }
      return this;
    };

    Smiles.prototype.checkClick = function (e) {
      return ((this.$wrapper[0] === e.target) ||
              (this.$wrapper[0] === $(e.target).closest(this.$wrapper[0])[0]));
    };

    return Smiles;
  }
);
