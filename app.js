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

app.listen(4000, () => {
  console.log("Listening on port 4000!");
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
app.use(express.urlencoded())                                                      


// code taken from Assignments from Server Side Scripting



// Submit Contact Form
app.post("/submit",validator, (req,res) => {
  
  const validationResults=validationResult(req);
  if(validationResults.isEmpty())
  {
    let name=req.body.name;
    let email=req.body.email;
    let message=req.body.msg;
  
    //Send a 200 OK if done!
    res.send("Submission Successful!");
  //   query(cp,`INSERT INTO contact (name,email,message) VALUES (${mysql.escape(name)},${mysql.escape(email)},${mysql.escape(message)})`)
  //   .then(results=> {
  //   res.send(results)
  //         })
  // .catch(error=>{
  // res.send(error)
  // });

     // res.redirect('/');
    // res.send("SUCCESS");
  }
  else{
     
      const a=validationResult(req).mapped();
      const newArray=Object.values(a);
      const errors=newArray.map(val=>val.msg);
      
      // Send a 422 if errors! status(422)
      // res.status(400);
      res.json(errors);
      
  }
})

