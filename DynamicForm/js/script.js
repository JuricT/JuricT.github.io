$(document).ready(function(e) {

	//iclude Jquery Image Dropdown v 3.5.2 
	try {
		$("body select").languages().msDropDown();
		$('li').languages();
	} catch(e) {
		alert(e.message);
	};

});