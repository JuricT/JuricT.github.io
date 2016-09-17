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

      View.prototype.clearNew = function() {
        this.elements.newNoteText.val('');
      };

      View.prototype.addNoteEnable = function() {
        this.elements.newNoteAddBtn.removeAttr('disabled');
      };

      View.prototype.addNoteDisable = function() {
        this.elements.newNoteAddBtn.attr('disabled', 'disabled');
      };

    return View;
  }
);
