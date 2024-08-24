//Load env variables
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

//Import dependencies
const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/connectToDB.js');
const notesController = require('./controllers/notesController.js');


//Create an express app
const app = express();

//Configure an express app
app.use(express.json());
app.use(cors());

//Connect to Database
connectToDB();

//Routing
app.get("/notes/:id", notesController.fetchNote);
app.get("/notes", notesController.fetchNotes);
app.post("/notes", notesController.createNotes);
app.put("/notes/:id", notesController.updateNotes);
app.delete("/notes/:id", notesController.deleteNotes);


//Start our server
app.listen(process.env.PORT);

//mongoDB password: edLgbSV7mYbTP0Ay
