let note = require('express').Router();
let {writeToFile, readAndAppend, readFromFile} = require('../../../helper/fileIO');
let uuid = require('../../../helper/uuid');
let fs = require('fs');


//get route for getting all the notes from database and response client the data in JSON format.
note.get('/', (req, res) => {
    console.info(`${req.method} request received for retreiving notes`);
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
 });
 
 //get route for submitting notes 
note.post('/', (req, res) => {
     console.info(`${req.method} request received to submit a notes`);
     const {title, text} = req.body; //refer to index.js line 69 handlenoteSave, must have title & text inside;
     if (title && text) {
     const newNote = {
         title,
         text,
         id: uuid(), //index.js file function line 56.id/
     };
     readAndAppend(newNote, './db/db.json');
     res.json('Successfully post newNote')
     } else{
     res.json('Error in posting newNote')
     }
 })
 
note.delete('/:id', (req, res)=> {
     console.info(`${req.method} request received for deleting note.`)
     const currentDb = fs.readFileSync('./db/db.json')//read thefile;
     const currentDbFile = JSON.parse(currentDb)//parse into json obj;
     const requestId = req.params.id
     const removeById = (currentDbFile, requestId) => {
         const requiredIndex = currentDbFile.findIndex(el => {
             return el.id === String(requestId);
         });
         if (requiredIndex === -1) {
             return false;
         };
         return !! currentDbFile.splice(requiredIndex, 1);
     }
     removeById(currentDbFile, requestId);
     // const currentDbString = JSON.stringify(currentDbFile);
     // console.log(currentDbString)
     writeToFile('./db/db.json', currentDbFile);
 })

module.exports = note;