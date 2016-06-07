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

        view.elements.listContainer.on('keyup', '.item_text', changeItem);

        view.elements.listContainer.on('blur', '.item_text', changeItem);

        function changeItem (e) {
          that.changeItem(e, this, model, view);
        }
      }// constructor

      addItem(model, view) {
        var newItem = view.elements.input.val();
        model.addItem(newItem);
        view.renderList(model.data);
        view.elements.input.val('');
      }

      changeItem(e, elem, model, view) {
        if ((e.keyCode === 13)||(e.type === 'focusout')){
          var positionIndex = $(elem).parent('li').data().index;
          var newText = $(elem).val();
          var oldText = model.data[positionIndex].text;
          if (oldText !== newText){
            model.changeItem(positionIndex, newText);
            view.renderList(model.data);
          }
        }
      }

      removeItem(elem, model, view) {
        var positionIndex = $(elem).parent('li').data().index;
        model.removeItem(positionIndex);
        view.renderList(model.data);
      }
    }// class Controller

    return Controller;
  }// define function
);// define
