//script.js
$(function(){

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