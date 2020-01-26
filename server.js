// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
const uuid = require("uuid/v4");
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// set this up to use assets
app.use("/public",express.static(path.join(__dirname, '/public')));
//routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
    
  });
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });



app.get("/api/notes",function(req,res){
  fs.readFile("./db/db.json", "utf8", function (err, data) {

    if (err) throw err;

    let storedNotes = JSON.parse(data);

    res.json(storedNotes);
});

});


app.post("/api/notes",function(req,res){

  let noteId = uuid();
  let newNote = {
    id: noteId,
    title: req.body.title,
    text: req.body.text
  };

  fs.readFile("./db/db.json","utf8",(err,data) =>{
    if (err) throw err;
    const savedNotes = JSON.parse(data);
    
    savedNotes.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(savedNotes, null, 2), err => {
      if (err) throw err;
      console.log("Note created!")
    });
  });
  res.send(db);
});
 
app.delete("/api/notes/:id",function(req,res){
    let noteId = req.params.id;

    fs.readFile("./db/db.json","utf8",(err,data)=>{
      if(err) throw err;
      const savedNotes = JSON.parse(data);
      const newAllNotes = savedNotes.filter(note => note.id != noteId);

      fs.writeFile("./db/db.json", JSON.stringify(newAllNotes, null, 2), err => {
        if (err) throw err;
        console.log("Note deleted!")
      });
    });
    res.send(db);
});

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });