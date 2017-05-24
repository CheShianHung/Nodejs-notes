const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');

const notes = require('./notes.js');
const titleOption = {
  describe: 'The title of the note',
  demand: true,
  alias: 't'
}
var argv = yargs
  .command('add', 'Add a new note', {
      title: titleOption,
      body: {
        describe: 'The body of the note',
        demand: true,
        alias: 'b'
      }
  })
  .command('list', 'List all the notes')
  .command('get', 'Get a specific note', {
    title: titleOption
  })
  .command('remove', 'Remove a specific note', {
    title: titleOption
  })
  .help()
  .argv;
var command = process.argv[2];
var logNote = (note) => {
  console.log(`Note Title: ${note.title}`);
  console.log(`Note Body: ${note.body}`);
};

if(command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if(note){
    console.log(`Note added`);
    console.log('---');
    logNote(note);
  }
  else{
    console.log('The title is already existed. Please try with another title name.');
  }

}
else if(command === 'list'){
  var note = notes.getAll();
  if(note.length === 0) console.log('There is no existing note.');
  else {
    note.forEach((n) => {
      console.log(' ');
      logNote(n);
    });
  }
}
else if(command === 'get'){
  var note = notes.getNote(argv.title);
  if(note) {
    logNote(note);
  }
  else {
    console.log('Note not found.');
  }

}
else if(command === 'remove'){
  if(notes.noteDelete(argv.title)){
    console.log('Node removed.');
  }else{
    console.log('Node not found.');
  }
}
else{
  console.log('unknown command');
}
