jQuery(document).ready(function(){

jQuery(".niceCheck").mousedown(
/* при клике на чекбоксе меняем его вид и значение */
function() {

     changeCheck(jQuery(this));
     
});


jQuery(".niceCheck").each(
/* при загрузке страницы нужно проверить какое значение имеет чекбокс и в соответствии с ним выставить вид */
function() {
     
     changeCheckStart(jQuery(this));
     
});


function changeCheck(el)
/* 
	функция смены вида и значения чекбокса
	el - span контейнер дял обычного чекбокса
	input - чекбокс
*/
{
     var el = el;
     var     input = el.find("input").eq(0);

   	 if (!input.prop("disabled"))
   	 
   	 if(!(input.prop("checked"))) {
		el.css("background-position","0 -17px");	
		input.prop("checked", false)
	} else {
		el.css("background-position","0 0");	
		input.prop("checked", true)
	}
     return true;
}

function changeCheckStart(el)
/* 
	если установлен атрибут checked, меняем вид чекбокса
*/
{
var el = el,
	input = el.find("input").eq(0);

	if (input.prop("checked")) {
	el.css("background-position","0 -17px");	
	};

	if (input.prop("disabled")) {
		el.css('backgroundImage','url(img/checkbox-disabled.png)');
		el.css('backgroundRepeat','no-repeat');
	};
	return true;
}

                                        });
