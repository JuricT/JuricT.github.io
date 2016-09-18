define(
  'app/controller',
  ['app/datetimepicker', 'app/note', 'app/model', 'app/view', 'app/helpers'],
  function(Datetimepicker, Note) {
    'use strict';

    function Controller (model, view, filter) {
      var that = this;
      that._model = model;
      that._view = view;
      that._filter = filter;

      this.datetimepickerInit(model);

      view.elements.newNoteBtn.on('click', function(e) {
        view.showAddNoteForm();
      });

      view.elements.newNoteAddBtn.on('click', function(e){
        that.addItem(model, view);
      });

      view.elements.newNoteText.keyup(function(e) {
        var val = view.elements.newNoteText.val();
        if (val) {
          view.addNoteEnable();
        } else {
          view.addNoteDisable();
        }
      });

      view.elements.listContainer.on('click', '.delete-item', function() {
        that.removeItem(this, model, view);
      });

      filter.wrapper.on('click', '.filter__text', function() {
        that.selectFilterItem(this);
      });

      filter.wrapper.on('click', '.filter__res-btn', function() {
        that.unSelectFilterItem(this);
      });
    }

    Controller.prototype.selectFilterItem = function(elem) {
      var id = $(elem).closest('.filter__item').data('id');

      this._filter.select(id);
      this._view.elementShow(this._filter.getItemElements(id, elem).buttonElem);

      this._view.renderNoteList();
    };

    Controller.prototype.unSelectFilterItem = function(elem) {
      var id = $(elem).closest('.filter__item').data('id');

      this._filter.unselect(id);
      this._view.elementHide(this._filter.getItemElements(id, elem).buttonElem);

      this._view.renderNoteList();
    };

    Controller.prototype.addItem = function() {
      var newNone = new Note(this._view);

      this._model.addItem(newNone);
      this._view.renderNoteList();
      this._filter.render();

      this.datetimepickerInit(this._model);

      this._view.clearNew();
    };

    Controller.prototype.removeItem = function(elem) {
      var id = $(elem).data().id;

      this._model.removeItem(id);
      this._view.renderNoteList();
      this._filter.render();
    };

    Controller.prototype.datetimepickerInit = function() {
      new Datetimepicker('#datetimepicker');
    };

  return Controller;
  }
);
