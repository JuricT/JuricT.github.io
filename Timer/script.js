//===================

var timer = new Timer();
var v = new View();
var c = new Control(timer,v);

//==================

function Timer() {
	var self = this;

	this.init = function () {
		self.currentTime = self.pauseTime = self.startTime = 0;
		self.hour = self.min = self.sec = self.msec = 0;
	}

	self.init();

	this.getTime = function () {
		return self.currentTime;
	}

	this.start = function (callback) {
		self.startTime = Date.now();

		self.timerName = setInterval(timerRun, 1);

		function timerRun(){
			var interval = Date.now() - self.startTime + self.pauseTime;// pause
			var H = 60 * 60 * 1000;
			var M = 60 * 1000;
			var S = 1000;

			self.hour = (interval / H) >> 0;
			interval = interval % H;

			self.min = (interval / M) >> 0;
			interval = interval % M;

			self.sec = (interval / S) >> 0;
			interval = interval % S;

			self.msec = interval;

			(callback)(self.toString());

		}
	};

	this.stop = function () {
		clearInterval(self.timerName);
		self.timerName = undefined;
		self.pauseTime = Date.now() - self.startTime + self.pauseTime;
	};

	this.reset = function () {
		self.stop();
		self.init();
	};

	this.getHour = function () {
		return self.hour
	}

	this.getMin = function () {
		return self.min
	}

	this.getSec = function () {
		return self.sec
	}

	this.getMSec = function () {
		return self.msec;
	}

	this.toString = function () {
		var outString = '';
	
		if (self.hour < 10) outString += '0' + self.hour
		else outString += self.hour + '';
		outString += ':';
		
		if (self.min < 10) outString += '0' + self.min
		else outString += self.min + '';
		outString += ':';

		if (self.sec < 10) outString += '0' + self.sec
		else outString += self.sec + '';
		outString += '.';

		if (self.msec > 99) outString += self.msec + '';
		if ((self.msec < 100)&&(self.msec > 9)) outString += '0' + self.msec;
		if (self.msec < 10) outString += '00' + self.msec;

		return outString;
	}
}//Timer

function View() {
	var self = this;

	self.counter = new Counter();

	self.elements = {
		timerContainer   : document.querySelector('.timer'),
		clockface        : document.querySelector('.timer').querySelector('.timer-clockface'),
		timerList        : document.querySelector('.timer').querySelector('.timer-list'),
		startPauseButton : document.querySelector('.timer-startStop'),
		splitButton      : document.querySelector('.timer-Split'),
		clearButton      : document.querySelector('.timer-Reset'),
	};

	this.start = function () {
		self.elements.startPauseButton.innerHTML = 'Stop';
	}

	this.stop = function () {
		self.elements.startPauseButton.innerHTML = 'Start';
		self.addSplit('Stop');
	}

	this.reset = function () {
		self.clearSplitList();
		self.elements.startPauseButton.innerHTML = 'Start';
		self.displayingTimer('00:00:00.000');
	}

	this.displayingTimer = function (string) {
		self.elements.clockface.innerHTML = string;
	};

	this.clearSplitList = function () {
		self.counter(0);
		self.elements.timerList.innerHTML = '';
	};

	this.addSplit = function (label) {
		var p = document.createElement('p');
		var str = self.counter() + ' ' + label + ': ' + self.elements.clockface.innerHTML;
		p.innerHTML = str;
		self.elements.timerList.appendChild(p);
	}
}//View

function Control(timer, view) {
	var self = this;

	var startPauseButton = view.elements.startPauseButton;
	var splitButton      = view.elements.splitButton;
	var clearButton      = view.elements.clearButton;

	startPauseButton.addEventListener('click', startPauseClick);
	splitButton.addEventListener('click', splitButtonClick);
	clearButton.addEventListener('click', resetButtonClick);

	function startPauseClick(){
		if (startPauseButton.innerHTML === 'Start') {
			timer.start(view.displayingTimer);
			view.start();
		}else {
			timer.stop();
			view.stop();
		}
	}//startPauseClick

	function splitButtonClick(){
		if (timer.timerName) view.addSplit('Split');
	}

	function resetButtonClick() {
		timer.reset();
		view.reset();
	}//splitButtonClick
}//Control

function Counter() {
	var count = 1;
	return function(num){
		count = num !== undefined ? num : count;
		return count++;
	}
}