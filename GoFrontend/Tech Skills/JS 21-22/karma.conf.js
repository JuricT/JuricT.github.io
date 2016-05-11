module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    files: [
      'spec/javascripts/pow.js',
      'spec/spec.js'
    ]
  });
};
