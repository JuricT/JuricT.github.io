define(
  'app/view',
  ['app/template', 'app/datetimepicker', 'app/model', 'jquery'],
  function (Template, Datetimepicker) {
    function View(model) {
        this.elements = {
          input: $('.input-item'),
          itemText: $('.item_text'),
          listContainer: $('#notes-conteiner'),
        };

        this.renderList(model._data);
        this.datetimepickerInit(model);
      }

      View.prototype.renderList = function(data) {
        var template = new Template('#item-template', this.elements.listContainer);
        template.render(data);
      };

      View.prototype.datetimepickerInit = function() {
        new Datetimepicker('#datetimepicker');
      };

    return View;
  }
);
