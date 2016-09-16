define(
  'app/helpers',
  [],
  function () {
    helpers = {
      dateToStr: function(date) {
        date = date || new Date();

        var day = this.twoDigit(date.getDate());
        var month = this.twoDigit(date.getMonth() + 1);
        var year = date.getFullYear();
        var hour = this.twoDigit(date.getHours());
        var min = this.twoDigit(date.getMinutes());

        return day + '.' + month + '.' + year + ' ' + hour + ':' + min;
      },
      twoDigit: function(num) {
        if (!this.isNumeric(num) || (num < 0)) return '';

        if (num < 10) {
          return '0' + num;
        } else {
          return num + '';
        }
      },
      isNumeric: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
      }

    };

    return helpers;
  }
);
