define(
  'app/hamburger',
  ['app/controller',
  'jquery'],
  function () {
    'use strict';

    function Hamburger(options) {
      var that = this;
      this.options = options;

      this.options.cross.hide();

      this.media();

      this.options.hamburger.click(function() {
        that.showMenu();
      });

      this.options.cross.click(function() {
        that.hideMenu();
      });

      $(window).resize(function(e) {
        that.media();
      });
    }

    Hamburger.prototype.media = function() {
      if (window.matchMedia('(min-width: 768px)').matches) {
        if (this.size !== 'deck') {
          this.options.menu.show();
          this.hide();
        }
        this.size = 'deck';
      } else {
        if (this.size !== 'mob') {
          this.options.menu.hide();
        }
        this.size = 'mob';
      }
    };

    Hamburger.prototype.show = function() {
      this.options.hamburger.hide();
      this.options.cross.show();
    };

    Hamburger.prototype.hide = function() {
      this.options.cross.hide();
      this.options.hamburger.show();
    };

    Hamburger.prototype.showMenu = function() {
      this.options.menu.slideDown( "slow", this.show.bind(this));
    };

    Hamburger.prototype.hideMenu = function() {
      this.options.menu.slideUp( "slow", this.hide.bind(this));
    };

    return Hamburger;
  }
);
