(function($){

    $.fn.mycarousel = function(options) {

        var defaults = {
            numberVisibleElements: 4,
            minNumberVisibleElements: 1,
            slideDuration: 500
        };

        var settings = $.extend(defaults, options);

        var numberVisibleElements = settings.numberVisibleElements;
        var slideDuration = settings.slideDuration;//ms

    	var $leftUIEl = $('.carousel-arrow-left');
        var $rightUIEl = $('.carousel-arrow-right');
        var $hider = $('.mycarousel-hider');
        var $elementsList = $('.mycarousel-list');
        var $Element = $('.mycarousel-element');

        var pixelsOffset = $($Element[1]).offset().left - $($Element[0]).offset().left;
        var currentLeftValue = 0;
        var elementsCount = $elementsList.find('.mycarousel-element').length;
        var minimumOffset = - ((elementsCount - numberVisibleElements) * pixelsOffset);
        var maximumOffset = 0;

        $hider.width(pixelsOffset * numberVisibleElements);

        var centerPositionLeft = ($('.mycarousel-wrapper').width()
                               - $leftUIEl.width()
                               - $hider.width()
                               - $rightUIEl.width()
                               )/2;//смещение от левого края для позиционирования по центру

        var position = $hider.offset();
        position.left += centerPositionLeft;
        $hider.offset(position);

        var position = $leftUIEl.offset();
        position.top += $($Element[1]).height()/2 - $leftUIEl.height()/2;
        position.left += centerPositionLeft;
        $leftUIEl.offset(position);

        var position = $rightUIEl.offset();
        position.top += $($Element[1]).height()/2 - $rightUIEl.height()/2;
        position.left += centerPositionLeft;
        $rightUIEl.offset(position);

     
        $leftUIEl.click(function() {        
            if (currentLeftValue != maximumOffset) {
                currentLeftValue += pixelsOffset;
                $elementsList.animate({ left : currentLeftValue + "px"}, slideDuration);
            }        
        });
     
        $rightUIEl.click(function() {        
            if (currentLeftValue != minimumOffset) {
                currentLeftValue -= pixelsOffset;
                $elementsList.animate({ left : currentLeftValue + "px"}, slideDuration);
            }        
        });

        return this;

    };

})(jQuery);