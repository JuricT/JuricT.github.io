// Variation init
var masonryContainer = $('.ideas__content')[0];
var masonryElement = $('.idea');
var settingMasonry = {
  percentPosition: true,
  columnWidth: '.grid-sizer',
  itemSelector: '.idea'
};

var MOBILE_BREAKPOINT  = 320;
var TABLE_BREAKPOINT   = 768;
var DESKTOP_BREAKPOINT = 960;
var sizeFlag;

var msnry;

//masonryInit(msnry);
resizeWindow();


$( window ).resize(resizeWindow);

function resizeWindow() {
  'use strict';
  var width = window.innerWidth;
  
  if (width < TABLE_BREAKPOINT) mobile()
  else if (width < DESKTOP_BREAKPOINT) tablet()
  else desktop();

  function mobile(){
    if (sizeFlag !== 'mobile') {
      sizeFlag = 'mobile';

      settingMasonry.gutter = 0;
      
      masonryInit(msnry);
    }
  }

  function tablet(){
    if (sizeFlag !== 'tablet') {
      sizeFlag = 'tablet';
      
      settingMasonry.gutter = masonryGetGutter();
      settingMasonry.gutter = 20;
      
      masonryInit(msnry);
    };

  }

  function desktop(){
    if (sizeFlag !== 'desktop') {
      sizeFlag = 'desktop';
      
      settingMasonry.gutter = 20 ;
      
      masonryInit(msnry);
    }
  }

}

function masonryGetGutter() {
  var gutter = parseInt(masonryElement.css('marginBottom'));
  return gutter;
}


function masonryInit(msnry) {
  msnry = new Masonry(masonryContainer, settingMasonry);
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