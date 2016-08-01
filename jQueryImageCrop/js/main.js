$(function () {
	var imgResult;

	var $preview = $('#preview');
	var $steps = $('#steps');
	var $description = $('#description-title');

	function readURL(input) {

	if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
					imgResult = e.target.result;
					$('#fancybox').click();
			}

			reader.readAsDataURL(input.files[0]);
	}
	}

	$("#imgInp").change(function(){
			readURL(this);
	});

	$('#upload-button').on('click', function (e) {
		$('#imgInp').click();
		e.preventDefault();
	})

	$(".various").fancybox({
		maxWidth		: 8000,
		maxHeight		: 6000,
		fitToView		: false,
		width				: '70%',
		height			: '70%',
		autoSize		: true,
		closeClick	: true,
		openEffect	: 'none',
		closeEffect	: 'none'
	});
});