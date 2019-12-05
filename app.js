const express = require("express");
const path = require("path");

// Validator files
const {validationResult} = require('express-validator');

const {validator} = require("./validators");



// CORS for local development and remote API requests
var cors = require("cors");

const app = express();

// Use CORS
app.use(cors());

app.listen(8080, () => {
  console.log("Listening on port 8080!");
});

// Use Router
const router = require("./routes/index.js");
app.use("/api", router);

// Static Middleware to serve the public folder as is
app.use(express.static(path.join(__dirname, "build")));

// Route handler for anything other than the API (Resolves to React router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});


// Use JSON - This will allow you to work with req.body
app.use(express.json());

// Submit Contact Form
app.post("/submit", (req,res) => {
  
  res.send(req.body)

  // const validationResults=validationResult(req);
  // if(validationResults.isEmpty())
  // {
  


  //   let name=req.body.name;
  //   let email=req.body.email;
  //   let msg=req.body.msg;
  
  //   // res.send(name);
  //   res.sendFile(path.join(__dirname, "./build/index.html"));


  // }
  // else{
     
  //     // const a=validationResult(req).mapped();
  //     // const newArray=Object.values(a);
  //     // const errors=newArray.map(val=>val.msg);
      
  //     // next(new Error,errors));
  // res.send( validationResults)
  // }




})

