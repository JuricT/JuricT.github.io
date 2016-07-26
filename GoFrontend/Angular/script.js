var app = angular.module('app', []);

var mainController = app.controller('mainController', function(){
  this.mainProperty = 'main Property';
;});

var ctrl1 = app.controller('ctrl1', function(myFactory){
  this.myFactory = myFactory;
  this.someProper = "Proper";
});
var ctrl2 = app.controller('ctrl2', function(myFactory){
  this.myFactory = myFactory;
  thissomeProper = 'ctrl2';
});

app.factory('myFactory', function(){
  return {
    hello: 'Hello world',
    sayHello: function(name){
      return 'Hello ' + name;
    }
  }
});

app.directive('bac', function(){
  return {
    link: function(scope, element, attr){
      element.on('click', function () {
                console.log('click', element.text());
                if (element.text() === 'foo') {
                    element.text('bar');
                } else {
                    element.text('foo');
                }
            });
    }
  }
});