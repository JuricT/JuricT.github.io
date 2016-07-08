$(document).ready(function(e) {

	var selectLang = [];
	var select;

	$("body select").each(function () {
		$.each(this, function( index, value ) {
			var $that = $(this);

			// selectLang.push({'title' : $that.data('title'), 'url' : $that.attr('value')});
			selectLang.push({'title' : $that.data('title'), 'url' : $that.data('url')});
			if ($that.attr('selected')) {
				select = $that.data('title');
			}
		});
	});

	//iclude Jquery Image Dropdown v 3.5.2 
	try {
		$("body select").msDropDown();
	} catch(e) {
		alert(e.message);
	};



	$('li').on('click', function (e) {
		var title = $(e.currentTarget).attr('title');

		if ((select !== title)&&($(e.currentTarget).hasClass('selected'))) {
			selectLang.forEach(function (item, i, arr) {
				if (item.title === title) { 
					select = title;
					window.location = item.url;
					// var protocol = window.location.protocol,
					// 		hostname = window.location.hostname,
					// 		pathname = window.location.pathname;

					// window.location = protocol + '//' + item.url + '.' + hostname + pathname;

				}
			});
		}
	});

});