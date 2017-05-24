const fs = require('fs');

var originalNote = {
  title: "This is a title",
  body: "This is the body"
}

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync("notes.json", originalNoteString);

var noteString = fs.readFileSync("notes.json");
var note = JSON.parse(noteString);

console.log(note.title, note.body);
console.log(typeof note);
