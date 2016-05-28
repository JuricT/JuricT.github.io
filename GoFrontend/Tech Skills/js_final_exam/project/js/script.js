var masonryElement = $('.idea');
var settingMasonry = {
  percentPosition: true,
  columnWidth: '.idea',
  itemSelector: '.idea'
};

var MOBILE_BREAKPOINT  = 320;
var TABLE_BREAKPOINT   = 768;
var DESKTOP_BREAKPOINT = 960;
var sizeFlag;

resizeWindow();

$( window ).resize(resizeWindow);

function resizeWindow() {
  var width = window.innerWidth;
  
  if (width < TABLE_BREAKPOINT) mobile()
  else if (width < DESKTOP_BREAKPOINT) tablet()
  else desktop();

  function mobile(){
    if (sizeFlag !== 'mobile') {
      sizeFlag = 'mobile';

      settingMasonry.gutter = 0;
      
      masonryInit();
    }
  }

  function tablet(){
    if (sizeFlag !== 'tablet') {
      sizeFlag = 'tablet';
      
      settingMasonry.gutter = masonryGetGutter();

      masonryInit();      
    };

  }

  function desktop(){
    if (sizeFlag !== 'desktop') {
      sizeFlag = 'desktop';
      
      settingMasonry.gutter = masonryGetGutter();
      
      masonryInit();
    }
  }

}

function masonryGetGutter() {
  var gutter = parseInt(masonryElement.css('marginBottom'));
  return gutter;
}


function masonryInit() {
  $('.ideas__content').masonry(settingMasonry);
  titlePositionCenter();
}

function titlePositionCenter() {
  var ideaHeight = masonryElement.height();

  $('.idea_title').each(function () {
    'use strict';
    var ideaTitleHeight = $(this).height();
    var ideaTitleTop = (ideaHeight - ideaTitleHeight) / 2;
    $(this).css('top', ideaTitleTop + 'px');
  });
}