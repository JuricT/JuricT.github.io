var timer = new Timer();
var timerContainer = document.querySelector('.timer');
var clockface = timerContainer.querySelector('.timer-clockface');
var timerList = timerContainer.querySelector('.timer-list');
var startPauseButton = document.querySelector('.timer-startStop');
var splitButton      = document.querySelector('.timer-Split');
var clearButton      = document.querySelector('.timer-Reset');
var timerEvent;

startPauseButton.addEventListener('click', startPauseClick);
splitButton.addEventListener('click', splitButtonClick);
clearButton.addEventListener('click', resetButtonClick);

// ==============================
// ========   Events   ==========

function startPauseClick(){
	if (startPauseButton.innerHTML === 'Start') {
		timer.reset();
		timerEvent = setInterval(timerRun, 13);
		startPauseButton.innerHTML = 'Stop';
	}else {
		clearInterval(timerEvent);
		startPauseButton.innerHTML = 'Start';
		//Добавляем строку 5 Stop: 00:00:00.000
		addSplits('Stop');
	}
}

function splitButtonClick(){
	//Добавляем строку 5 Split: 00:00:00.000
	addSplits('Split');
}

function resetButtonClick() {
	clearInterval(timerEvent);
	timer.reset();
	printTimer(clockface, timer);
	startPauseButton.innerHTML = 'Start';
	//очищаем список
	counter(0);
	timerList.innerHTML = '';
}

// =============================
// ======== Functions ==========

function addSplits(label){
	var p = document.createElement('p');
	var str = counter() + ' ' + label + ': ' + clockface.innerHTML;
	p.innerHTML = str;
	timerList.appendChild(p);

}

//Счетчик записей в списке засечек времени.
var counter = (function(){
	var count = 1;
	return function(num){
		count = num !== undefined ? num : count;
		return count++;
	}
}());



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
