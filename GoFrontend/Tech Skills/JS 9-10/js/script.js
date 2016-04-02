$(function () {
	// Selects
    var params = {
        changedEl: ".select-wrapper select",
        visRows: 3,
        scrollArrows: true
    }
    cuSel(params);

    // Menu
    $('.menu li').hover(handlerIn, handlerOut);

    function handlerIn(e) {
    	slider($(this), true);
    }
    function handlerOut(e) {
		slider($(this), false);
;    }

    function slider($that, showBox){
	    if ($that.hasClass('dropdown')) {
			var $dropdown = $that;
			var $a = $dropdown.find('a').eq(0);
			var position = $a.offset();
			var $subMenu = $dropdown.find('.sub-menu').eq(0)

			if ($dropdown.parent().hasClass('menu')) {
				position.top += +$a.css('lineHeight').replace(/[^-\d\.]/g, '')
			}
			else {
				position.left += +$dropdown.css('width').replace(/[^-\d\.]/g, '')
								  - +$dropdown.css('textIndent').replace(/[^-\d\.]/g, '');
				position.top -= 8;
			}

			var heightBlock = +$subMenu.css('height').replace(/[^-\d\.]/g, '')
			var backgroundColorOld = getColor($subMenu.css('backgroundColor'));
			var backgroundColorNew = getColor($subMenu.closest('.menu-wrapper').css('backgroundColor'));

			if (showBox) {
				$subMenu.show();
				$subMenu.offset(position);
				$subMenu.css({'overflow':'hidden','height':'0px'});

				// Анимируем появление подменю
				animate({
					duration: 200,
					timing: function(timeFraction) {return timeFraction},
					draw: function(progress) {

						var rgb = [];
						for (var i = 0; i < 3; i++) {
							rgb[i] = Math.round(backgroundColorNew[i] - (backgroundColorNew[i] - backgroundColorOld[i]) * progress);
						}
						$subMenu.show();
						$subMenu.css('backgroundColor', 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')');
						$subMenu.css('height', (heightBlock*progress)+'px');
						$subMenu.css('overflow','hidden');




					},
					complete: function(){
						$subMenu.css('overflow','visible');
					},
					show: true
				});

			}else{
				// Анимируем скрытие подменю
				animate({
					duration: 200,
					timing: function(timeFraction) {return timeFraction},
					draw: function(progress) {
						$subMenu.css('height', (heightBlock*(1-progress))+'px');
						$subMenu.css('overflow','hidden');
						$subMenu.show();

					},
					complete: function(){
			    		$subMenu.removeAttr('style');//Удаляем стили
				    },
					show: false
				});
	        }

		    function animate(options) {

		    	if (!start)
				var start = performance.now();

				requestAnimationFrame(function animate(time) {
					// timeFraction от 0 до 1
					var timeFraction = (time - start) / options.duration;
					if (timeFraction > 1) timeFraction = 1;

					// текущее состояние анимации
					var progress = options.timing(timeFraction)

					options.draw(progress);

					if (timeFraction < 1) requestAnimationFrame(animate);
					if ((timeFraction === 1)&&(options.complete)) options.complete();
				});
			}
    	}

    }

function getColor(string){
	var color = ['','',''];
	var colorNumber = 0;
	var j = 0;
	string = string.replace('rgb(','');
	string = string.replace(' ','');
	string = string.replace(' ','');
	string = string.replace(')','');

	for (var i = 0; i < string.length; i++) {
		if (string[i] === ',') {
			j++
		} else {
			color[j] += string[i];
		}
	}
	for (var i = 0; i < 3; i++)	color[i] = +color[i];

	return color;
}

});
