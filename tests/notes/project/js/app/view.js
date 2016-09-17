define(
  'app/view',
  ['app/template', 'app/model', 'jquery'],
  function (Template) {
    function View(model) {
        this.elements = {
          newNote: $('.new-note'),
          newNoteText: $('#new-note-text'),
          newNoteBtn: $('.new-note-btn'),
          newNoteDate: $('#datetimepicker'),
          newNoteAddBtn: $('.new-note-add-btn'),
          listContainer: $('#notes-conteiner')
        };

        this.renderList(model.data);
      }

      View.prototype.renderList = function(data) {
        var template = new Template('#item-template', this.elements.listContainer);
        template.render(data);
      };

    return View;
  }
);
