define(
  'controller',
  ['model', 'view'],
  function() {
    class Controller {
      constructor(model, view) {
        var that = this;

        view.elements.input.keydown((e) => {
          if(e.keyCode == 13) {
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
      }// constructor

      addItem(model, view) {
        var newItem = view.elements.input.val();

        model.addItem(newItem);

        view.renderList(model.data);
        view.elements.input.val('');
      }

      positionIndex($elem) {
        return $elem.parent('li').data().index;
      }

      changeItem(e, $elem, model, view) {
        var positionIndex = this.positionIndex($elem);
        var tempObj = model.data[positionIndex];

        if ($elem.hasClass('item_text')) tempObj.text = $elem.val();
        if ($elem.hasClass('toggle')) tempObj.status = $elem.prop('checked') ? false : true;

        model.changeItem(positionIndex, tempObj);
        view.renderList(model.data);
      }

      removeItem(elem, model, view) {
        var positionIndex = this.positionIndex($(elem));

        model.removeItem(positionIndex);
        view.renderList(model.data);
      }
    }// class Controller

    return Controller;
  }// define function
);// define
