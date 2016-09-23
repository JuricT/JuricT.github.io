
(function($){

  function textContainer() {
    var that = this;
    this.attr('contenteditable', 'true');
    this.addClass('textContainer');

    this.clear = function() {
      this.empty();
    };

    this.insertSmileAtCursor = function(name) {
      var $smile = $(document.createElement('img'));
      $smile.addClass('smile smile--' + name).css("display","inline-block");
      var smile = $smile[0];

      var sel = window.getSelection();

      if (sel.getRangeAt && sel.rangeCount) {
        var currentInputElement = sel.focusNode.tagName ? sel.focusNode: sel.focusNode.parentNode;

        if (currentInputElement === that[0]) {
          var range = window.getSelection().getRangeAt(0);
          range.insertNode(smile);
          SetCursorAfterElement(smile);
        }
      }

      function GetRange() {
        var sel = document.getSelection();
        if(sel.rangeCount > 0)
          return sel.getRangeAt(0);

        return false;
      }

      function SetRange(range) {
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }

      function SetCursorAfterElement(el) {
        var range = document.createRange();
        range.setStartAfter(el);
        range.setEndAfter(el);
        SetRange(range);
      }

      function SetCursorToEnd() {
        inputElement.focus();
        var range = document.createRange();
        range.selectNodeContents(inputElement);
        range.collapse(false);
        SetRange(range);
      }
  };

    return this;
  }



  //bind in jquery
  $.fn.extend({
    textContainer: textContainer
  });

})(jQuery);
