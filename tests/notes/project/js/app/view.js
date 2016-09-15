define(
  'app/view',
  ['app/model', 'jquery', 'tmpl', 'datetimepicker'],
  function () {
    class View {
      constructor(model){
        this.elements = {
          input: $('.input-item'),
          itemText: $('.item_text'),
          listContainer: $('#notes-conteiner'),
        };
        this.renderList(model.data);
        this.datetimepickerInit(model);
      }

      renderList(data) {
        var list = tmpl($('#item-template').html(), {data: data});
        this.elements.listContainer.html(list);
      }

      datetimepickerInit(model) {
        $.datetimepicker.setLocale('ru');
        $('#datetimepicker').datetimepicker({
          format:'d.m.Y H:i',
          value: model.getDate(),
          step:1
        });
      }

    }

    return View;
  }
);
