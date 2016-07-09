// jquery.languages.js
// author: Juric Talovirov - http://www.upwork.com/o/profiles/users/_~017d1ec0112e5878f0/
// Date: 9 July, 2016 
/*
//This plugin allows you to select the language of the site using MSDropDown - jquery.dd.js
*/ 
(function($){
		var langList = [];

	//languages class
	function languages(options, elem) {

		//Initialize defaults settings
		this.defaults = {
			localStorageDataKey: 'language',
			defaultLanguage: 'English'
		};//var defaults

		//Overriding the default settings with the received parameters
		this.settings = $.extend(this.defaults, options);


		this.getListLang = function() {
			$.each(elem, function() {
				var $that = $(this);
				var selectLang = loadLang();

				// selectLang.push({'title' : $that.data('title'), 'url' : $that.attr('value')});
				langList.push({'title' : $that.data('title'), 'url' : $that.data('url')});

				if (selectLang) {
					if (selectLang === $that.data('title')) {
						$that.attr('selected', 'selected');
					}
				} else {
					if (settings.defaultLanguage === $that.data('title')) {
						$that.attr('selected', 'selected');
					}
				}

			});

			return langList;
		}

			//Read language from localStorage
		this.loadLang = function() {
			var lsKey = settings.localStorageDataKey;
			var dataJSON = localStorage[lsKey];

			//if the language is not selected will return the default language
			if (!dataJSON) { return settings.defaultLanguage}

			return JSON.parse(dataJSON);
		}//function loadLang()

		//Save select language to localStorage
		this.saveLang = function(lang) {
			var dataJSON;
			var lsKey = settings.localStorageDataKey;

			dataJSON = JSON.stringify(lang);

			localStorage[lsKey] = dataJSON;
		}//function saveLang (lang)

		this.eventLanguages = function() {
			$(elem).on('click', function (e) {
				var title = $(e.currentTarget).attr('title');

				if (($(e.currentTarget).hasClass('selected'))) {
					langList.forEach(function (item, i, arr) {
						if (item.title === title) { 
							saveLang(title);
							window.location = item.url;
							// var protocol = window.location.protocol,
							// 		hostname = window.location.hostname,
							// 		pathname = window.location.pathname;

							// window.location = protocol + '//' + item.url + '.' + hostname + pathname;

						}//if (item.title === title)
					});//langList.forEach
				}//if ((select !== title)&&($(e.currentTarget).hasClass('selected')))
			});//this.on('click', function (e) 
		}//function eventLanguages ()

		return this;

	};//function languages(options)



//bind in jquery
$.fn.extend({
			languages: function(settings) {
				return this.each(function() {
					if ($(this).is('select')) {
						languages(settings, this).getListLang();
					} else {
						languages(settings, this).eventLanguages();
					}
				});//this.each(function()
			}//languages: function(settings) 
});//$.fn.extend({

})(jQuery);