module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    files: [
      // 'spec/javascripts/pow.js',
      "node_modules/jasmine-es6/lib/install.js",
      'project/spec/spec.js'
    ]
  });
};
