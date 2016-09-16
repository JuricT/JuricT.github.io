define(
  'app/datetimepicker',
  ['app/helpers', 'jquery', 'datetimepicker'],
  function () {
    function Datetimepicker(querySelector) {
      $.datetimepicker.setLocale('ru');
      $(querySelector).datetimepicker({
        format:'d.m.Y H:i',
        value: helpers.dateToStr(),
        step:1
      });
    }

    return Datetimepicker;
  }
);
