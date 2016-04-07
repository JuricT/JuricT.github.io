"use strict";
(function($){

    $.fn.testform = function(options) {


        if ((options.title)&&(options.questions)) {

        var $wrapper = $(this);
        var buttonSubmit;
        var testForm;


        var createTest = {
            countAnswer: 1,
            answerArr: [],
            questionText: [],

            testList: document.createElement('ol'),

            createTestHeader: function(textHeader) {
                var h4 = document.createElement('h1');
                h4.innerHTML = textHeader;
                $wrapper.append(h4);
            },

            createTestForm: function() {
                testForm = document.createElement('form');
                $wrapper.append(testForm);
                testForm.appendChild(this.testList);

                buttonSubmit = document.createElement('input');
                buttonSubmit.type = 'submit';
                buttonSubmit.value = 'Проверить мои результаты'
                testForm.appendChild(buttonSubmit);
            },

            createQuestion: function (questions){
                if ((questions.question)&&(questions.answers)) {
                    var question = document.createElement('li');
                    var div = document.createElement('div');
                    var headerQuestion = document.createElement('p');

                    this.testList.appendChild(question);
                    headerQuestion.classList.add('headerQuestion');
                    headerQuestion.innerHTML = questions.question;
                    question.appendChild(headerQuestion);
                    div.classList.add('checkbox');
                    var answerBox = question.appendChild(div);
                    var parentElem = answerBox.appendChild(document.createElement('label'))
                    var labFirst = this.createFirsAnswer(parentElem, questions.answers[0]);
                    this.answerArr.push(labFirst);
                    if (questions.answers.length > 1) {
                        for (var i = 1; i < questions.answers.length; i++){
                            this.answerArr.push(this.cloneAnswer(questions.answers[i]));
                        };
                        this.appendCloneAnswer(this.answerArr, answerBox);
                    }
                }            
            },

            createFirsAnswer: function(parentElem, answer){

                var input = document.createElement('input');
                var labFirst = parentElem;
                var answerID = 'answer-1-1';
                var textAnswer = document.createElement('span');
                textAnswer.classList.add('answerText');
                textAnswer.innerHTML = answer.answer;
                textAnswer.id = answerID;
                input.type = 'checkbox';
                input.name = answerID;
                input.value = answerID;
                input.setAttribute('correct', answer.correct);
                labFirst.appendChild(input);
                labFirst.appendChild(textAnswer);
                return labFirst;
            },

            cloneAnswer: function (answer){
                var labN = this.answerArr[0].cloneNode(true);
                var answerID = 'answer-1-' + ++this.countAnswer;
                labN.querySelector('input').name = answerID;
                labN.querySelector('input').value = answerID;
                labN.querySelector('input').setAttribute('correct', answer.correct);
                labN.querySelector('span').innerHTML = answer.answer;
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

        createTest.createTestHeader(options.title);
        createTest.createTestForm();


        options.questions.forEach(function(item, i, arr) {
            createTest.createQuestion(item);
        });

        $(testForm).on('submit', function(e){
            e.preventDefault();// действие по умолчанию обнуляет форму
            var correctAnswerSet = 0;
            var correct = 0;
            var uncorrect = 0;
            var $checkboxs = $(this).find('input:checkbox');
            $checkboxs.each(function(index, domElement){
                var check = $(this).prop('checked');
                var correctSet = ($(this).attr('correct') === 'true') ? true : false;
                if (check === correctSet) correct++;
                if (check !== correctSet) uncorrect++;
            });
            if (uncorrect) {
                console.log(
                    'Количество правильных ответов - ' + correct 
                    + ' количество не правильных ответов ' + uncorrect);
            } else {
                console.log('Поздравляем!!! Вы блестяще прошли тест.');
            }
            
            // console.log('Результат теста - ' + (Math.round(correct/(correct + uncorrect)*100 * 10) / 10) + '%');
            

        });


    }

    return this;

};
})(jQuery);








