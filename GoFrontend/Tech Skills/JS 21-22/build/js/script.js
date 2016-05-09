"use strict";

var app = {
  sayHello: function sayHello(name) {
    return "Hello " + name + "!";
  }
};

try {
  module.exports = app;
} catch (e) {}

(function ($, undefined) {
  $(function () {
    // //==============================================
    // //                CHECK ANSWERS
    // //==============================================
    //
    //   $('.test-form').on('submit', function(e){
    //     e.preventDefault();
    //
    //     let correctAnswerSet = 0;
    //     let correct = 0;
    //     let uncorrect = 0;
    //     let $checkboxs = $(this).find('input:checkbox');
    //
    //     $('.modal-bg').css('display','flex');
    //
    //     $checkboxs.each(function(index, domElement){
    //       let $this = $(this);
    //       let check = $this.prop('checked');
    //       let correctSet = ($this.attr('correct') === 'true') ? true : false;
    //       if ((check)&&(check === correctSet)) correct++;
    //       if ((check)&&(check !== correctSet)) uncorrect++;
    //       if (correctSet) correctAnswerSet++;
    //     });
    //
    // //==============================================
    // //              PRINT TEST RESULT
    // //==============================================
    //
    //     $('.modal-content').html(`Вы дали ${correct} правильных ответов, из ${correctAnswerSet} возможных.`);
    //   });
    //
    //
    // //==============================================
    // //              CLOSE MODAL WINDOW
    // //==============================================
    //   $('.modal-body').on('click', '.close', closeModalWindow);
    //   function closeModalWindow(e){
    //     $('.modal-bg').css('display','none');
    //     $('.test-form').find('input:checkbox').each(function(){
    //       $(this).prop("checked", false);
    //     });
    //   }
    //
    //==============================================
    //                    THE END
    //==============================================
  });
})(jQuery);