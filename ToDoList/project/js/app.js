requirejs.config({
    baseUrl: 'js/app',
    paths: {
      'tmpl': '../lib/template'
    },
    shim: {
      'tmpl': {
        exports: 'tmpl'
      }
    }
});

requirejs(['main']);
