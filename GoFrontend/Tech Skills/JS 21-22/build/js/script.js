'use strict';

(function ($, undefined) {
  $(function () {

    //==============================================
    //                CHECK ANSWERS
    //==============================================

    $('.test-form').on('submit', function (e) {
      e.preventDefault();

      var correctAnswerSet = 0;
      var correct = 0;
      var uncorrect = 0;
      var $checkboxs = $(this).find('input:checkbox');

      $('.modal-bg').css('display', 'flex');

      $checkboxs.each(function (index, domElement) {
        var $this = $(this);
        var check = $this.prop('checked');
        var correctSet = $this.attr('correct') === 'true' ? true : false;
        if (check && check === correctSet) correct++;
        if (check && check !== correctSet) uncorrect++;
        if (correctSet) correctAnswerSet++;
      });

      //==============================================
      //              PRINT TEST RESULT
      //==============================================

      $('.modal-content').html('Вы дали ' + correct + ' правильных ответов, из ' + correctAnswerSet + ' возможных.');
    });

    //==============================================
    //              CLOSE MODAL WINDOW
    //==============================================
    $('.modal-body').on('click', '.close', closeModalWindow);
    function closeModalWindow(e) {
      $('.modal-bg').css('display', 'none');
      $('.test-form').find('input:checkbox').each(function () {
        $(this).prop("checked", false);
      });
    }

    //==============================================
    //                    THE END
    //==============================================
  });
})(jQuery);