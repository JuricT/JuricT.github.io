var metod = require('./javascripts/pow.js');

describe ('Метод pow должен возводить', function () {

  it ('положительное число в положительную степень (2, 2)', function () {
    var res = metod.pow(2, 2);
    expect(res).toBe(4);
  });

  it ('отрицательное число в положительную степень (четную) (-2, 2)', function () {
    var res = metod.pow(-2, 2);
    expect(res).toBe(4);
  });

  it ('отрицательное число в положительную степень (нечетную) (-2, 3)', function () {
    var res = metod.pow(-2, 3);
    expect(res).toBe(-8);
  });

  it ('ноль в положительную степень (0, 2)', function () {
    var res = metod.pow(0, 2);
    expect(res).toBe(0);
  });

  it ('положительное число в нулевую степень (2, 0)', function () {
    var res = metod.pow(2, 0);
    expect(res).toBe(1);
  });

  it ('отрицательное число в нулевую степень (-2, 0)', function () {
    var res = metod.pow(-2, 0);
    expect(res).toBe(1);
  });

  it ('положительное число в отрицательную степень (2, -2)', function () {
    var res = metod.pow(2, -2);
    expect(res).toBe(0.25);
  });

  it ('отрицательное число в отрицательную степень (-2, -2)', function () {
    var res = metod.pow(-2, -2);
    expect(res).toBe(0.25);
  });
});

describe ('Метод pow не должен возводить', function () {
  it ('ноль в нулевую степень (0, 0)', function () {
    var res = metod.pow(0, 0);
    expect(res).toBeNaN();
  });

  it ('ноль в отрицательную степень (0, -2)', function () {
    var res = metod.pow(0, -2);
    expect(res).toBeNaN();
  });

});
