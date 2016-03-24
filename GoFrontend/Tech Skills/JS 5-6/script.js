;(function(){
var timer = new Timer();
var clockface = document.querySelector('.timer-clockface');
var startPauseButton = document.querySelector('.start-pause');
var clearButton = document.querySelector('.clear');
var timerEvent;
var START_BUTTON_TEXT = 'Start';
var PAUSE_BUTTON_TEXT = 'Pause';
var timeStart;
var pause = 0;

startPauseButton.addEventListener('click', startPauseClick);//Клик кнопки Запуск/пауза таймера
clearButton.addEventListener('click', clearButtonClick);//Клик кнопки Сброс таймера

function startPauseClick(){
	if (startPauseButton.innerHTML === START_BUTTON_TEXT) {
		timeStart = Date.now();
		timerEvent = setInterval(timerRun, 1);
		startPauseButton.innerHTML = PAUSE_BUTTON_TEXT;
	}else {
		clearInterval(timerEvent);
		pause = Date.now() - timeStart + pause;
		startPauseButton.innerHTML = START_BUTTON_TEXT;
	}
}

function clearButtonClick() {
	pause = 0;
	clearInterval(timerEvent);
	timer.reset();
	printTimer(clockface, timer);
	startPauseButton.innerHTML = START_BUTTON_TEXT;
}

function timerRun(){
	interval(timeStart, Date.now(), timer);
	printTimer(clockface, timer);
}

function interval(startTime, endTime, timer) {
	var interval = Date.now() - timeStart + pause;
	var H = 60 * 60 * 1000;
	var M = 60 * 1000;
	var S = 1000;

	timer.hour = (interval / H) >> 0;
	interval = interval % H;

	timer.min = (interval / M) >> 0;
	interval = interval % M;

	timer.sec = (interval / S) >> 0;
	interval = interval % S;

	timer.msec = interval;
	return timer;
}

function printTimer(element, timer){
	var outString = '';
	
	if (timer.hour < 10) outString += '0' + timer.hour
	else outString += timer.hour + '';
	outString += ':';
	
	if (timer.min < 10) outString += '0' + timer.min
	else outString += timer.min + '';
	outString += ':';

	if (timer.sec < 10) outString += '0' + timer.sec
	else outString += timer.sec + '';
	outString += '.';

	if (timer.msec > 99) outString += timer.msec + '';
	if ((timer.msec < 100)&&(timer.msec > 9)) outString += '0' + timer.msec;
	if (timer.msec < 10) outString += '00' + timer.msec;

	element.innerHTML = outString;
}

function Timer(){
	this.hour = 0;
	this.min  = 0;
	this.sec  = 0;
	this.msec = 0;
	this.reset = function(){
		this.hour = 0;
		this.min  = 0;
		this.sec  = 0;
		this.msec = 0;
	};
	this.hourInc = function(){
		++this.hour;
		if (this.hour > 23) {
			this.hour = 0;
		}
	};
	this.minInc = function(){
		++this.min;
		if (this.min > 59) {
			this.min = 0;
			this.hourInc();
		}
	};
	this.secInc = function(){
		++this.sec;
		if (this.sec > 59) {
			this.sec = 0;
			this.minInc();
		}
	};
	this.msecInc = function(){
		if (arguments.length > 0) this.msec += arguments[0]
		else ++this.msec;
		if (this.msec > 999) {
			this.msec = 0;
			this.secInc();
		}
	};
};
}());