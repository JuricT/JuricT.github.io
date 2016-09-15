requirejs.config({
  baseUrl: "js/lib",
  paths: {
    app: "../app",
    jquery: "jquery",
    tmpl: "template",
    datetimepicker: "jquery.datetimepicker"
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
