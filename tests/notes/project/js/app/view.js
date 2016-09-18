define(
  'app/view',
<<<<<<< HEAD
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
          value: model.dateToStr(),
          step:1
        });
      }
=======
  ['app/template', 'app/model', 'app/filter', 'jquery'],
  function (Template) {
    function View(model, filter) {
>>>>>>> td

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
      filter.render();
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
