define(
  'app/template',
  ['app/helpers', 'jquery', 'tmpl'],
  function (helpers) {
    'use strict';

    function Template(querySelector, element) {
        this._querySelector = querySelector;
        this._element = element || document.body;
      }

      Template.prototype.render = function(data) {
        var list = tmpl($(this._querySelector).html(), {
          data: data,
          helpers: helpers
        });

        this._element.html(list);
      };

    return Template;
  }
);
