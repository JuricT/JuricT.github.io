requirejs.config({
  baseUrl: "js/lib",
  paths: {
    app: "../app",
    jquery: "jquery",
    tmpl: "template",
    datetimepicker: "jquery.datetimepicker",
    lodash: "lodash.min"
  },
  shim: {
    tmpl: {
        exports: "tmpl"
      },
    datetimepicker: {
        deps: ["jquery"],
        exports: "datetimepicker"
      }
  }

});

requirejs(['app/main']);
