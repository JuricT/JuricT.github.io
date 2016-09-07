;(function(){
  'use strict';
  
  var t1 = new Timer({
    elem: document.getElementById('timer'),
    clockface: document.getElementsByClassName('timer-clockface')[0],
    startStopBtn: document.getElementsByClassName('timer-startStop')[0],
    splitBtn: document.getElementsByClassName('timer-Split')[0],
    resetBtn: document.getElementsByClassName('timer-Reset')[0],
    splitList: document.getElementsByClassName('timer-list')[0]
  });
  
  function Timer(options) {

    this.elements = {
      erapper: options.elem,
      clockface: options.clockface,
      startStopBtn: options.startStopBtn,
      splitBtn: options.splitBtn,
      resetBtn: options.resetBtn,
      splitList: options.splitList
    };
    
    var that = this;
    
    this.model = {
      const:{
        h: 60 * 60 * 1000,
        m: 60 * 1000,
        s: 1000,
      },
      
      timeReset: function() {
        this.start = this.pause = null;
      },
      
      initTime: function(){     
        this.start = Date.now();
        this.pause = this.pause || 0;
      },
      
      frozen: function() {
        this.pause = Date.now() - this.start + this.pause;
      },
      
      interval: function() {
        if (!('start' in this) || (!(this.start > 0))) return 0;
        this.pause = this.pause || 0;
        
        return Date.now() - this.start + this.pause;
      },
      
      getHour: function() {
        var interval = this.interval();
        
        if (interval === 0) return 0;
        
        interval = this.interval();
        
        return (interval / this.const.h) >> 0;
      },
      
      getMin: function() {
        var interval = this.interval();
        
        if (interval === 0) return 0;
        
        interval = interval % this.const.h;

        return (interval / this.const.m) >> 0; 
      },
      
      getSec: function() {
        var interval = this.interval();
        
        interval = interval % this.const.h;
        interval = interval % this.const.m;

        return (interval / this.const.s) >> 0; 
      },
      
      getMsec: function(interval) {
        var interval = this.interval();
        
        if (interval === 0) return 0;
        
        interval = interval % this.const.h;
        interval = interval % this.const.m;
        interval = interval % this.const.s;

        return interval; 
      },
      
      getTime: function() {
        var time = this;
        
        var hour = time.getHour();
        var min = time.getMin();
        var sec = time.getSec();
        var msec = time.getMsec();
        
        var outString = '';
	
        if (hour < 10) outString += '0' + hour
        else outString += hour + '';
        outString += ':';

        if (min < 10) outString += '0' + min
        else outString += min + '';
        outString += ':';

        if (sec < 10) outString += '0' + sec
        else outString += sec + '';
        outString += '.';

        if (msec > 99) outString += msec + '';
        if ((msec < 100)&&(msec > 9)) outString += '0' + msec;
        if (msec < 10) outString += '00' + msec;

        return outString;
      }
    };
    
    this.view = {      
      showTime: function() {
        that.elements.clockface.innerHTML = that.model.getTime();
      },
      
      trigStartStopBtn: function() {
        if (that.elements.startStopBtn.innerHTML === 'Start') {
          that.elements.startStopBtn.innerHTML = 'Stop';
        } else {
          that.elements.startStopBtn.innerHTML = 'Start';
        };
      },
      
      clear: function() {
        that.elements.startStopBtn.innerHTML = 'Start';
        that.elements.clockface.innerHTML = '00:00:00.000';
        that.elements.splitList.innerHTML = '';
      },
      
      addSplits: function(label) {
        var p = document.createElement('p');
        var str = 1 + ' ' + label + ': ' + that.elements.clockface.innerHTML;
        p.innerHTML = str;
        that.elements.splitList.appendChild(p);
      }
    };
    
    this.controller = {
      init: function() {
        that.elements.startStopBtn.addEventListener('click', function(){
          that.controller.startPause();
        });
        that.elements.splitBtn.addEventListener('click', function(){
          that.controller.split();
        });
        that.elements.resetBtn.addEventListener('click', function(){
          that.controller.reset();
        });
      },
      
      startPause: function() {
        
        if (that.elements.startStopBtn.innerHTML === 'Start') {
          that.controller.start();
          that.view.trigStartStopBtn();
        } else {
          that.controller.stop();
          that.view.trigStartStopBtn();
        }
      },
      
      split: function() {
        that.view.addSplits('qqq');
      },
      
      reset: function() {
        this.clearInt();
        that.model.timeReset();
        that.view.clear();
      },
      
      labelInterval: '',
      
      start: function() {
        that.model.initTime();
        this.setInt();
      },
      
      stop: function() {
        that.model.frozen();
        this.clearInt();
      },
      
      setInt: function() {
        this.labelInterval = this.labelInterval || setInterval(that.view.showTime, 1);
      },
      
      clearInt: function() {
        clearInterval(this.labelInterval);
        this.labelInterval = '';
      }

    };

    that.controller.init();

  }
  
}());