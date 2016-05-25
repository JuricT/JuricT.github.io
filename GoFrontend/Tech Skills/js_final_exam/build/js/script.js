var elem = document.querySelector('.ideas__content');
var settingMasonry = {
  percentPosition: true,
  columnWidth: '.grid-sizer',
  itemSelector: '.idea'
};

var msnry = new Masonry( elem, settingMasonry);
var ideaHeight = $('.idea').height();

// Title position - cetner
 $('.idea_title').each(function(){
  var ideaTitleHeight = $(this).height();
  var ideaTitleTop = (ideaHeight - ideaTitleHeight) / 2;
   console.log(ideaTitleTop);
  $(this).css('top', ideaTitleTop + 'px');
 });
