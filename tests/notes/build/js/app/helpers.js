define(
  'app/helpers',
  [],
  function () {
    helpers = {
      dateToStr: function(date) {

        if (date === 'undefined') {
          date = new Date();
        } else if (this.getClass(date) !== 'Date') {
          return date + '';
        }

        var day = this.twoDigit(date.getDate());
        var month = this.twoDigit(date.getMonth() + 1);
        var year = date.getFullYear();
        var hour = this.twoDigit(date.getHours());
        var min = this.twoDigit(date.getMinutes());

        return day + '.' + month + '.' + year + ' ' + hour + ':' + min;
      },

      strToDate: function(str) {
        var arr = str.replace(/[' ', ':']/g, '.').split('.');
        var date = new Date(+arr[2], +arr[1] - 1, +arr[0], +arr[3], +arr[4]);
        return date;
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
      },

      getClass: function(obj) {
        return {}.toString.call(obj).slice(8, -1);
      },

      escapeHtml: function(text) {
        return text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      },

      unEscapeHtml: function(text) {
        var textType = this.getClass(text);
        if (textType !== 'String') return textType;

        return text
          .replace(/\n/g, '<br>');
      }

    };

    return helpers;
  }
);
