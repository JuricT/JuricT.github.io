requirejs.config({
  baseUrl: 'js/app',
  paths: {
    lib: '../lib',
    jquery: '../lib/jquery',
    tmpl: '../lib/template',
    lodash: '../lib/lodash.min',
    helpers: '../lib/helpers'
  },
  shim: {
    tmpl: {
        exports: 'tmpl'
      },
    textContainer: {
        deps: ['jquery'],
        exports: 'textContainer'
      }
  }
});

requirejs(['main']);
