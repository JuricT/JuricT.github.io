$(function() {
  "use strict";
  var $accordion = $('.accordion');
  var $panel = $accordion.find('.panel');
  $accordion.on('click', setPanelActive);

  function setPanelActive(e) {
    var $selectPanel = $(e.target).parent('.panel');

    if ($selectPanel.hasClass('active')) {
      $selectPanel.removeClass('active');
    } else {
      $panel.removeClass('active');
      $selectPanel.addClass('active');
    }
  }

});
