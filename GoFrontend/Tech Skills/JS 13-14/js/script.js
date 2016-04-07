"use strict";
$(function(){

 	var options = {
 			title: 'Тест по программированию',
            questions: [
            	{
            		question : 'Вопрос №1',
            		answers:[
            			{
            				answer: 'Вариант ответа №1',
            				correct: true
            			},
            			{
            				answer: 'Вариант ответа №2',
            				correct: false
            			},
            			{
            				answer: 'Вариант ответа №3',
            				correct: false
            			}
            		]
            	},
            	{
            		question : 'Вопрос №2',
            		answers:[
            			{
            				answer: 'Вариант ответа №1',
            				correct: true
            			},
            			{
            				answer: 'Вариант ответа №2',
            				correct: false
            			},
            			{
            				answer: 'Вариант ответа №3',
            				correct: false
            			}
            		]
            	},
            	{
            		question : 'Вопрос №3',
            		answers:[
            			{
            				answer: 'Вариант ответа №1',
            				correct: true
            			},
            			{
            				answer: 'Вариант ответа №2',
            				correct: false
            			},
            			{
            				answer: 'Вариант ответа №3',
            				correct: false
            			}
            		]
            	}

            ]
 	};


	$('#wrapper').testform(options);

});