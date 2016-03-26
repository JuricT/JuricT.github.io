;$(function() {

		$('.tabs-item').each(function(i){
			$(this).attr('data-tab', 'tab' + i);
		});
		$('.tabs-content').each(function(i){
			$(this).attr('data-tab', 'tab' + i);
		});

   $('.tabs-item').on('click', function(){
   	var $getTabs = $(this).closest('.tabs');
   	var $dataTab = $(this).data('tab');

   	$getTabs.find('.tabs-item').removeClass('tabs-item--active');
   	$(this).addClass('tabs-item--active');

   	$getTabs.find('.tabs-content').hide();
   	$getTabs.find('div[data-tab=' + $dataTab + ']').show();
   });

   // Tooltip
   $('.form .form-input').hover(function(){
      var $position = $(this).offset();
      var $form = $(this).closest('.form');
      var $tooltip = $form.find('.tooltip');
      var $text = $(this).data('title');

      $position.left += $(this).width() + 25;

      $tooltip.text($text);
      $tooltip.show();
      $tooltip.offset($position);

   }, function(){
      var $form = $(this).closest('.form');
      $form.find('.tooltip').hide();
   });



});