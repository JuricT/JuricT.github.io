define(
  'app/controller',
  ['app/datetimepicker', 'app/model', 'app/view'],
  function(Datetimepicker) {
    function Controller (model, view) {
      var that = this;
      var ENTER = 13;

      this.datetimepickerInit(model);

      view.elements.newNoteAddBtn.on('click', function(e){
        that.addItem(model, view);
      });

      // view.elements.input.keydown(function(e) {
      //   if(e.keyCode == ENTER) {
      //     that.addItem(model, view);
      //   }
      // });

      view.elements.listContainer.on('click', '.delete-item', function() {
        that.removeItem(this, model, view);
      });
    }

    Controller.prototype.addItem = function(model, view) {

      var newNone = {
        id: new Date().getTime(),
        text: helpers.escapeHtml(view.elements.newNoteText.val()),
        date: helpers.strToDate(view.elements.newNoteDate[0].value)
      };

      model.addItem(newNone);
      view.renderList(model.data);
    };

    Controller.prototype.removeItem = function(elem, model, view) {
      var id = $(elem).data().id;

      model.removeItem(id);
      view.renderList(model.data);
    };

    Controller.prototype.datetimepickerInit = function() {
      new Datetimepicker('#datetimepicker');
    };

  return Controller;
  }
);
