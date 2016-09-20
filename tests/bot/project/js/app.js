requirejs.config({
  baseUrl: "js/app",
  paths: {
    lib: "../lib",
    jquery: "../lib/jquery",
    tmpl: "../lib/template",
    lodash: "../lib/lodash.min"
  },
  shim: {
    tmpl: {
        exports: "tmpl"
      }
  }
});

requirejs(['main']);
