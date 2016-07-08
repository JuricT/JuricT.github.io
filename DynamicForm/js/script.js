$(document).ready(function(e) {
	var title = [], url = [];
	var selectLang = [];
	var select;

	$("body select").each(function () {
		$.each(this, function( index, value ) {
			var $that = $(this)
			url.push($that.data('url'));
			title.push($that.data('title'));
			selectLang.push({'title' : $that.data('title'), 'url' : $that.data('url')});
			if ($that.attr('selected')) {
				select = $that.data('title');
			}
		});
	});
			console.log(selectLang);

	// $('[name = frmdata]').on('click', function (e) {
	// 	console.log(e);
	// });

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
				}
			});
		}
	});

});