define(
  'template',
  ['jquery', 'tmpl'],
  function () {
    'use strict';

    function Template(querySelector, element) {
      this._querySelector = querySelector;
      this._element = $(element);
      if (!element) console.log('Template: element is undefined');
      if (!querySelector) console.log('Template: querySelector is undefined');

      return this;
    }

    Template.prototype.render = function(data) {
      var list;

      try {
        list = tmpl($(this._querySelector).html(), {data: data});
      } catch (e) {
        console.log(e);
      }

      if (list) this._element.html(list);

      return this;
    };

    return Template;
  }
);
