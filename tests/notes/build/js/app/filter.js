define(
  'app/filter',
  ['app/helpers', 'app/location', 'app/template', 'jquery'],
  function (helpers, location, Template) {
    'use strict';

    function Item(id, str) {
      this.id = id;
      this.title = str;
      this.selected = false;
    }

    function FilterByDate(model) {
      var that = this;
      this._model = model;

      this.wrapper = $('.filter');

      if (!('_listItems' in this)) {
        this._listItems = model.data.sortList;

        if ((this._listItems)&&(this._listItems.length>0)) {
          this.render(this._listItems);
        } else {
          this.render();
        }
      }
    }

    FilterByDate.prototype.render = function(data) {
      var template = new Template('#filter-template', this.wrapper);

        if ((data !== this._listItems) || (data === undefined)) {
          this._listItems =  this.getListItems();
          data = this._listItems;
        } else {
          data = this._listItems;
        }

      template.render(data);
    };

    FilterByDate.prototype.getListItems = function() {
      var listItems = [];
      var listQuery = this.getQuery();
      var data = this.getSortedData(listQuery);

      for (var i = 0; i < data.length; i++) {
        var text = (listQuery[i]) ? this.getDay(listQuery[i]) : location.olds;
        listItems[i] = new Item(i, text);
      }

      this._listItems = listItems;
      this._model.addSortList(listItems);

      return listItems;
    };

    FilterByDate.prototype.getData = function() {
      var data = [];
      var sortedData = this.getSortedData();
      var all = true;

      if (!this._listItems) return this._model.data.noteList;

      for (var i = 0; i < this._listItems.length; i++) {
        if ((this._listItems[i].selected) && (sortedData[i])) {
          data.push(sortedData[i]);
        }
        if (this._listItems[i].selected) all = false;
      }

      if (all) return this._model.data.noteList;

      data = _.flatten(data);
      return data;
    };

    FilterByDate.prototype.select = function(id) {
      this._listItems[id].selected = true;
    };

    FilterByDate.prototype.unselect = function(id) {
      this._listItems[id].selected = false;
    };

    FilterByDate.prototype.getItemElements = function(id, elem) {
      if ( !('elements' in this._listItems[id]) ) {
        var $itemElem = $(elem).closest('.filter__item');
        var $textElem = $itemElem.find('.filter__text');
        var $buttonElem = $itemElem.find('.filter__res-btn');

        return {
          itemElem: $itemElem,
          textElem: $textElem,
          buttonElem: $buttonElem
        };
      }

      return this._listItems[id].elements;
    };

    FilterByDate.prototype.getQuery = function() {

      if (!this._model.data.noteList.length) return [];

      var lastDate = this._model.data.noteList[0].date;

      var daysQuery = [
        this.quailTime(lastDate, 0),
        this.quailTime(lastDate, 1),
        this.quailTime(lastDate, 2)
      ];

      return daysQuery;
    };

    FilterByDate.prototype.getSortedData = function(query) {
      var sortedData = [];
      query = query || this.getQuery();

outer:
      for (var i = 0; i < this._model.data.noteList.length; i++) {
        var noteDay = +this.quailTime(this._model.data.noteList[i].date, 0);

        for (var j = 0; j < 3; j++) {
          if (noteDay === +query[j]) {
            sortedData[j] = sortedData[j] || [];
            sortedData[j].push(this._model.data.noteList[i]);
            continue outer;
          }
        }

        sortedData[j] = sortedData[j] || [];
        sortedData[j].push(this._model.data.noteList[i]);
      }

      return sortedData;
    };

    FilterByDate.prototype.getDay = function(date) {
      if (helpers.getClass(date) !== 'Date') return;

      var DAYS = [
        location.daysOfTheWeek.sunday,
        location.daysOfTheWeek.monday,
        location.daysOfTheWeek.tuesday,
        location.daysOfTheWeek.wednesday,
        location.daysOfTheWeek.thursday,
        location.daysOfTheWeek.friday,
        location.daysOfTheWeek.saturday
      ];

      return DAYS[date.getDay()];
    };

    FilterByDate.prototype.quailTime = function(dateNow, amountOfDays) {
      if (helpers.getClass(dateNow) !== 'Date') return;
      if (!helpers.isNumeric(amountOfDays)) return;

      return new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        dateNow.getDate() - amountOfDays
      );
    };

    return FilterByDate;
  }
);
