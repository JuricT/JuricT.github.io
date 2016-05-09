// fs = require('fs');
// jquery = fs.readFileSync('./files/lib/jquery-1.12.3.min.js','utf-8'); // depends on the file encoding
// eval(jquery);

var app = require('../build/js/script.js');
var jQuery = require('./files/lib/jquery-1.12.3.min.js');

describe('Testing module checkings "test form"', () => {
  it('It shold tets some metod', () => {
    //prepare
    var result,
        name = 'Juric';
    //act
      result = app.sayHello(name);
    //assert
    expect(result).toBe(`Hello ${name}!`);
  });//close 'It shold tets some metod'
});// close 'Testind module 1'
