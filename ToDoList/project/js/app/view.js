define(
  'view',
  ['model', '../lib/jquery', 'tmpl'],
  function () {
    class View {
      constructor(model){
        this.elements = {
          input: $('.input-item'),
          itemText: $('.item_text'),
          listContainer: $('.todolist__list'),
        };

        this.renderList(model.data);
      }// View constructor

      renderList(data) {
        var list = tmpl($('#item-template').html(), {data: data});
        this.elements.listContainer.html(list);
      }//View renderList

    }//class View

    return View;
  }// define function
);// define
