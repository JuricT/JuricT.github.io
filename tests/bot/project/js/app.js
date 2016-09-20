requirejs.config({
  baseUrl: 'js/app',
  paths: {
    lib: '../lib',
    jquery: '../lib/jquery',
    tmpl: '../lib/template',
    lodash: '../lib/lodash.min',
    helpers: '../lib/helpers',
    fancybox: '../lib/jquery.fancybox'
  },
  shim: {
    tmpl: {
        exports: 'tmpl'
      },
    fancybox: {
        deps: ['jquery'],
        exports: 'fancybox'
      }
  }
});

requirejs(['main']);
