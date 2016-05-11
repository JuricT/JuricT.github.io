
var obj = {
  pow: function(a, b) {
    var res = 1;
    if ((a === 0) && (b <= 0)) return NaN;
    if ((a === 0) && (b > 0)) return 0;
    if (b === 0) return 1;
    if (b > 0) {
      while (b--) res *= a;
      return res;
    }
    else {
      while (b++) res *= a;
      return 1/res;
    }
  }
};

try {
  module.exports = obj;
} catch (e) {}
