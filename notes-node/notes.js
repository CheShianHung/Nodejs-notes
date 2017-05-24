var fs = require('fs');

var fetchNotes = () => {
  var notes = [];
  try{
    var notesstring = fs.readFileSync('notes-data.json');
    notes = JSON.parse(notesstring);
  } catch(e){

  }
  return notes;
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  }

  var duplicateNotes = notes.filter((note) => note.title === title);
  if(duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  debugger;
  var notes = fetchNotes();
  notes = notes.filter((note) => note.title === title);
  return notes[0];
}

var noteDelete = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title != title);
  saveNotes(filteredNotes);
  return notes.length != filteredNotes.length;
}

module.exports = {
  addNote,
  getAll,
  getNote,
  noteDelete
};
