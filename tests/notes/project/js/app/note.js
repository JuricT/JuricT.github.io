define(
  'app/note',
  ['app/helpers'],
  function (Helpers) {
    function Note(view) {
      this.id = new Date().getTime();
      this.text = helpers.escapeHtml(view.elements.newNoteText.val());
      this.date = helpers.strToDate(view.elements.newNoteDate[0].value);
    }

    return Note;
  }
);


try {
  module.exports = Note;
} catch (e) {}
