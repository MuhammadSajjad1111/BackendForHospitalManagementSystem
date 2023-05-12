const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const app=express();

// connect to the db

mongoose.connect('mongodb://127.0.0.1:27017/hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database!');
});

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// defining routes

const patientRouter=require("./Router/patientRouter.js");
const appointmentRouter=require("./Router/appointmentRouter.js");

app.use("/patient", patientRouter );
app.use("/appointment", appointmentRouter );

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));






