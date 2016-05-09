$(function() {
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
      $slidePoint.removeClass(activeClass);
      if ($(e.target).hasClass('.slide-point')) {
        $(e.target).addClass(activeClass);
      } else {
        $(e.target).parent('.slide-point').addClass(activeClass);
      }

      for (var i = 0; i < $slidePoint.length; i++) {
        if ($($slidePoint[i]).hasClass(activeClass)){
          activeN = i;
          break;
        }
      }
      console.log(activeN);
      $slidList.removeClass(activeClass);
      console.log($slidList[activeN]);
      $($slidList[activeN]).addClass(activeClass);
    }

  });
});
