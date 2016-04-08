'use strict';
$(function(){

	var testFormDada = {
		title: 'Тест по программированию',
		submit: 'Проверить мои результаты',
		questions: [
			{
				question : 'Вопрос №1',
				answers:[
					{
						answer: 'Правильный вариант ответа',
						correct: true
					},
					{
						answer: 'Неправильный вариант ответа',
						correct: false
					},
					{
						answer: 'Правильный вариант ответа',
						correct: true
					}
				]
			},
			{
				question : 'Вопрос №2',
				answers:[
					{
						answer: 'Правильный вариант ответа',
						correct: true
					},
					{
						answer: 'Неправильный вариант ответа',
						correct: false
					},
					{
						answer: 'Неправильный вариант ответа',
						correct: false
					}
				]
			},
			{
				question : 'Вопрос №3',
				answers:[
					{
						answer: 'Правильный вариант ответа',
						correct: true
					},
					{
						answer: 'Правильный вариант ответа',
						correct: true
					},
					{
						answer: 'Неправильный вариант ответа',
						correct: false
					}
				]
			}
		]
	};

	localStorage.setItem('testQuestions', JSON.stringify(testFormDada));

	testFormDada = localStorage.getItem('testQuestions');

	testFormDada = JSON.parse(testFormDada);


	//Create Test Form DOM
	var testFormTemplateString = $('#test-form').html();

	var testFormDOM = tmpl(testFormTemplateString, testFormDada); 

	$('.wrapper').append(testFormDOM);

	$('.test-form').on('submit', function(e){
		e.preventDefault();
		$('.modal-bg').css('display','flex');
		var correctAnswerSet = 0;
		var correct = 0;
		var uncorrect = 0;
		var $checkboxs = $(this).find('input:checkbox');
		$checkboxs.each(function(index, domElement){
			var check = $(this).prop('checked');
			var correctSet = ($(this).attr('correct') === 'true') ? true : false;
			if ((check)&&(check === correctSet)) correct++;
			if ((check)&&(check !== correctSet)) uncorrect++;
			if (correctSet) correctAnswerSet++;
		});

		$('.modal-content').html(`Вы дали ${correct} правильных ответов, из ${correctAnswerSet} возможных.`);
	
	});

	$('.modal-body').on('click', '.close', closeModalWindow);


	function closeModalWindow(e){
		$('.modal-bg').css('display','none');
		$('.test-form').find('input:checkbox').each(function(){
			$(this).prop("checked", false);
		});
	};



});