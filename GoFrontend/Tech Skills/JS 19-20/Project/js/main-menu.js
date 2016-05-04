$(function() {
  "use strict";
  var $mainMenuLink = $('.main-menu_link');
  var $mainMenuLi = $('.main-menu ul li');
  $mainMenuLink.on('click', setLinkAction);

  function setLinkAction(e) {
    $mainMenuLi.removeClass('active');
    $(e.target).parent('li').addClass('active');
  }

});
