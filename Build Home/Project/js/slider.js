$(function() {
  "use strict";
  $('.slider').each(function() {
    var $slider = $(this);
    var $slidList = $slider.find('.slid');

    var $points = $slider.find('.points');
    var svg = $points.html();
    var $slidePoint = $points.find('.slide-point');

    var activeClass = 'active';
    $slidePoint.addClass(activeClass);

    var activeN;

    for (var i = 1; i < $slidList.length; i++) {
      $($points).append(svg);
    }

    var pointsLeft = ($slider.width() - $points.width()) / 2;
    $($points).css('left', pointsLeft + 'px');


    $slidePoint = $points.find('.slide-point');

    $points.on('click', clickPoint);

    function clickPoint(e) {
      var $target = $(e.target);

      if ($target.get(0) === $points.get(0)) return;

      $slidePoint.removeClass(activeClass);

      if ($target.hasClass('.slide-point')) {
        $target.addClass(activeClass);
      } else {
        $target.parent('.slide-point').addClass(activeClass);
      }

      for (var i = 0; i < $slidePoint.length; i++) {
        if ($($slidePoint[i]).hasClass(activeClass)){
          activeN = i;
          break;
        }
      }

      $slidList.removeClass(activeClass);
      $($slidList[activeN]).addClass(activeClass);
    }

  });
});
