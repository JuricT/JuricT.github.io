var createTest = {
	countAnswer: 1,
	answerArr: [],
	questionText: [],

	testList: document.createElement('ol'),

	createTestHeader: function(textHeader) {
		var h4 = document.createElement('h4');
		h4.innerHTML = textHeader;
		document.body.appendChild(h4);
	},

	createTestForm: function() {
		var testForm = document.createElement('form');
		document.body.appendChild(testForm);
		testForm.appendChild(this.testList);

		var buttonSubmit = document.createElement('input');
		buttonSubmit.type = 'submit';
		buttonSubmit.value = 'Проверить мои результаты'
		testForm.appendChild(buttonSubmit);
	},

	createQuestion: function (questionText){
		var question = document.createElement('li');
		var div = document.createElement('div');
		var headerQuestion = document.createElement('p');

		this.testList.appendChild(question);
		headerQuestion.classList.add('headerQuestion');
		headerQuestion.innerHTML = questionText;
		question.appendChild(headerQuestion);
		div.classList.add('checkbox');
		var answerBox = question.appendChild(div);
		var parentElem = answerBox.appendChild(document.createElement('label'))
		var labFirst = this.createFirsAnswer(parentElem, arguments[1]);
		this.answerArr.push(labFirst);
		if (arguments.length > 2) {
			for (var i = 2; i < arguments.length; i++){
				this.answerArr.push(this.cloneAnswer(arguments[i]));
			};
			this.appendCloneAnswer(this.answerArr, answerBox);
		}
	},

	createFirsAnswer: function(parentElem, answerText){
		var input = document.createElement('input');
		var labFirst = parentElem;
		var answerID = 'answer-1-1';
		var textAnswer = document.createElement('span');
		textAnswer.classList.add('answerText');
		textAnswer.innerHTML = answerText;
		textAnswer.id = answerID;
		input.type = 'checkbox';
		input.name = answerID;
		input.value = answerID;

		labFirst.appendChild(input);
		labFirst.appendChild(textAnswer);
		return labFirst;
	},

	cloneAnswer: function (answerText){
		var labN = this.answerArr[0].cloneNode(true);
		answerID = 'answer-1-' + ++this.countAnswer;
		labN.querySelector('input').name = answerID;
		labN.querySelector('input').value = answerID;
		labN.querySelector('span').innerHTML = answerText;
		labN.querySelector('span').id = answerID;
		return labN;
	},

	appendCloneAnswer: function (answerArr, parentElem){
		var answerNumber = answerArr.length;
		for (var i = 1; i<answerNumber; i++){
			parentElem.appendChild(document.createElement('br'));
			answerArr[0].parentNode.appendChild(answerArr[i]);
		}
		answerArr.length = 0;
	}
};

createTest.createTestHeader('Тест по программированию');
createTest.createTestForm();

createTest.createQuestion('Вопрос №1', 'Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3');
createTest.createQuestion('Вопрос №2', 'Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3');
createTest.createQuestion('Вопрос №3', 'Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3');


