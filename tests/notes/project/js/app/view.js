define(
  'app/view',
  ['app/template', 'app/model', 'app/filter', 'jquery'],
  function (Template) {
    function View(model, filter) {

      var that = this;

      this._model = model;
      this._filter = filter;

      this.elements = {
        newNote: $('.new-note'),
        newNoteForm: $('.add-note-form'),
        newNoteText: $('#new-note-text'),
        newNoteBtn: $('.new-note-btn'),
        newNoteDate: $('#datetimepicker'),
        newNoteAddBtn: $('.new-note-add-btn'),
        listContainer: $('#notes-conteiner')
      };

      this.renderNoteList();
    }

    View.prototype.renderNoteList = function() {
      var data = this._filter.getData();
      var template = new Template('#item-template', this.elements.listContainer);
      template.render(data);
    };

    View.prototype.clearNew = function() {
      this.elements.newNoteText.val('');
      this.addNoteDisable();
    };

    View.prototype.addNoteEnable = function() {
      this.elements.newNoteAddBtn.removeAttr('disabled');
    };

    View.prototype.addNoteDisable = function() {
      this.elements.newNoteAddBtn.attr('disabled', 'disabled');
    };

    View.prototype.elementHide = function(elem) {
      elem.addClass('hide');
    };

    View.prototype.elementShow = function(elem) {
      elem.removeClass('hide');
    };

    View.prototype.showAddNoteForm = function() {
      this.elements.newNoteBtn.addClass('hide');
      this.elements.newNoteForm.removeClass('hide');
    };

    return View;
  }
);
