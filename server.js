// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/public",express.static(path.join(__dirname, '/public')));
//routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
    
  });
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });



app.get("/api/notes",function(req,res){
   fs.readFile("./db/db.json","utf8",function(error, data) {

    if (error) {
      return console.log(error);
    }
  
    return console.log(data);
  
  });
});

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });