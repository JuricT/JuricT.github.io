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







;(function(){
  var cache = {};
 
  this.tmpl = function tmpl(str, data){
    // Выяснить, мы получаем шаблон или нам нужно его загрузить
    // обязательно закешировать результат
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      // Сгенерировать (и закешировать) функцию, 
      // которая будет служить генератором шаблонов
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Сделать данные доступными локально при помощи with(){}
        "with(obj){p.push('" +
       
        // Превратить шаблон в чистый JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // простейший карринг(термин функ. прог. - прим. пер.)
    // для пользователя
    return data ? fn( data ) : fn;
  };
})();
;;$(function(){

	$(this).mycarousel({
		numberVisibleElements: 3,
		slideDuration: 400
	});

	var template = $('#resume').html();
	data = {
		resumeTitle: 'Таловиров Юрий Валериевич',
		resumeAvatar: 'img/Ava.jpg',
		specialty: 'Инженер автоматических систем управления',
		itemps: [
			'Люблю программировать',
			'Нужнаная и полезная работа',
			'Достойная оплата труда'
			],
		phoneNumber: '+380509385312',
		vk: 'https://vk.com/id14289104',
		feedback: 'Если нужно, могу сверстать сайт'
		
	};
	var content = tmpl(template, data);
	$('.wrapper').append(content);

});