define(
  'app/template',
  ['jquery', 'tmpl'],
  function () {
    function Template(querySelector, element) {
        this._querySelector = querySelector;
        this._element = element || document.body;
      }

      Template.prototype.render = function(data) {
        var list = tmpl($(this._querySelector).html(), {data: data});
        this._element.html(list);
      };

    return Template;
  }
);