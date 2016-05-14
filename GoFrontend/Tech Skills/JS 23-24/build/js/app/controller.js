define('controller', ['model', 'view'], function () {
  class Controller {
    constructor(model, view) {

      // view.elements.addBtn.on('click', addItem);
      view.elements.input.keydown(e => {
        if (e.keyCode == 13) {
          addItem();
          console.log('13');
        }
      });

      view.elements.listContainer.on('click', '.delete-item', removeItem);

      view.elements.listContainer.on('keyup', '.item_text', changeItem);
      view.elements.listContainer.on('blur', '.item_text', changeItem);

      function addItem() {
        var newItem = view.elements.input.val();
        model.addItem(newItem);
        view.renderList(model.data);
        view.elements.input.val('');
      }

      function changeItem(e) {
        if (e.keyCode === 13 || e.type === 'focusout') {
          var positionIndex = $(this).parent('li').data().index;
          var newText = $(this).val();
          var oldText = model.data[positionIndex].text;
          if (oldText !== newText) {
            model.changeItem(positionIndex, newText);
            view.renderList(model.data);
          }
        }
      }

      function removeItem() {
        var positionIndex = $(this).parent('li').data().index;
        model.removeItem(positionIndex);
        view.renderList(model.data);
      }
    } // constructor
  } // class Controller

  return Controller;
} // define function
); // define