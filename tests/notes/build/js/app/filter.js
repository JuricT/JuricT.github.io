define('app/filter', [], function () {

  class Filter {

    constructor(options) {
      console.log("Filter is init");
    }

  }

  return Filter;
});

try {
  module.exports = Filter;
} catch (e) {}