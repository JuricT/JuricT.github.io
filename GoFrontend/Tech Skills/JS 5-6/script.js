var timer = new Timer();
var clockface = document.querySelector('.timer-clockface');
var startPauseButton = document.querySelector('.start-pause');
var clearButton = document.querySelector('.clear');
var timerEvent;

startPauseButton.addEventListener('click', startPauseClick);
clearButton.addEventListener('click', clearButtonClick);

function startPauseClick(){
	if (startPauseButton.innerHTML === 'Start') {
		timerEvent = setInterval(timerRun, 13);
		startPauseButton.innerHTML = 'Pause';
	}else {
		clearInterval(timerEvent);
		startPauseButton.innerHTML = 'Start';
	}
}

function clearButtonClick() {
	clearInterval(timerEvent);
	timer.reset();
	printTimer(clockface, timer);
	startPauseButton.innerHTML = 'Start';
}

function timerRun(){
	timer.msecInc(13);
	printTimer(clockface, timer);
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