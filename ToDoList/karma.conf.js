module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    preprocessors: {
            'test-context.js': ['webpack']
        },
    files: [
      { pattern: 'test-context.js', watched: false },
      // 'node_modules/babel-polyfill/dist/polyfill.js',
      // 'node_modules/jasmine-es6/lib/install.js',
      // 'project/js/app/model.js',
      // '/spec/model_spec.js'
    ],
    webpack: {
           module: {
               loaders: [
                   { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
               ]
           },
           watch: true
       },
       webpackServer: {
           noInfo: true
       }
  });
};
