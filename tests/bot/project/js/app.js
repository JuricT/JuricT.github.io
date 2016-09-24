requirejs.config({
  baseUrl: 'js/app',
  paths: {
    lib: '../lib',
    jquery: '../lib/jquery',
    tmpl: '../lib/template'
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
