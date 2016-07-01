;$(function() {
      var timersTitleHide = [];

      $('.tabs-item').each(function(i){
         $(this).attr('data-tab', 'tab' + i);
      });
      $('.tabs-content').each(function(i){
         $(this).attr('data-tab', 'tab' + i);
      });

      $('.form-input').each(function(i){
         var $tooltip;
         var $position;
         var $form = $(this).closest('.form');

         if ($(this).data('title')) {
            $tooltip = $('<div class="tooltip" data-tooltip-id="' + i + '"></div>');
            $tooltip.text($(this).data('title'));
            $tooltip.appendTo($(this).closest('.form'));
            $(this).attr('data-tooltip-id', i);

            $position = $(this).offset();
            $position.left += $(this).width() + 25;

            $tooltip.offset($position);
         }
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
   $('.form .form-input').hover(showTooltip, hideTooltip);
   $('.form .tooltip').hover(showTooltip, hideTooltip);

   //button
   $('.button').on({
      mousedown: function(){
         var $form = $(this).closest('.form');

         $(this).addClass('button-click');
         $(this).closest('.form').find('.tooltip').show();
      },
      mouseup: function(){
         $(this).removeClass('button-click');
      } 
   });

function showTooltip(){
   var $form = $(this).closest('.form');
   var tooltipID = $(this).data('tooltip-id');
   var $tooltip = $form.find('div[data-tooltip-id=' + tooltipID + ']');

   if (timersTitleHide[tooltipID]) clearTimeout(timersTitleHide[tooltipID]);

   $tooltip.show();
};

function hideTooltip(){
   var $that = $(this);
   var tooltipID = $that.data('tooltip-id');
   console.log('timers[' + tooltipID + '] hideTooltip()');
   
   timersTitleHide[tooltipID] = setTimeout(function(){
      callback($that);
   }, 800);

   function callback(elem){
      elem.closest('.form').find('div[data-tooltip-id=' + tooltipID + ']').hide();
   }
};

});