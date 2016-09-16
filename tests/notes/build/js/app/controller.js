define(
  'app/controller',
  ['app/model', 'app/view'],
  function() {
    function Controller (model, view) {
      var that = this;
      var ENTER = 13;

      view.elements.input.keydown(function(e) {
        if(e.keyCode == ENTER) {
          that.addItem(model, view);
        }
      });

      view.elements.listContainer.on('click', '.delete-item', function() {
        that.removeItem(this, model, view);
      });

      view.elements.listContainer.change( function(e) {
        var $target = $(e.target);

        if (($target.hasClass('item_text')) || ($target.hasClass('toggle'))) {
          that.changeItem(e, $target, model, view);
        }
      });
    }

    Controller.prototype.addItem = function(model, view) {
      var newItem = view.elements.input.val();

      model.addItem(newItem);

      view.renderList(model.data);
      view.elements.input.val('');
    };

    Controller.prototype.positionIndex = function($elem) {
      return $elem.parent('li').data().index;
    };

    Controller.prototype.changeItem = function(e, $elem, model, view) {
      var positionIndex = this.positionIndex($elem);
      var tempObj = model.data[positionIndex];

      if ($elem.hasClass('item_text')) tempObj.text = $elem.val();
      if ($elem.hasClass('toggle')) tempObj.status = $elem.prop('checked') ? false : true;

      model.changeItem(positionIndex, tempObj);
      view.renderList(model.data);
    };

    Controller.prototype.removeItem = function(elem, model, view) {
      var positionIndex = this.positionIndex($(elem));

      model.removeItem(positionIndex);
      view.renderList(model.data);
    };

  return Controller;
  }
);
