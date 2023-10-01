// import express module
const express = require("express");
// import body parser module
const bodyParser = require("body-parser");
// import mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/educationBD');
const bcrypt = require("bcrypt");
// import multer module
const multer = require("multer");
// import path module
const path = require("path");
// import axios module
const axios = require("axios");
// create app express
const app = express();
// import jsonwebtoken module
const jwt = require('jsonwebtoken');
// import express-session module
const session = require('express-session');
// importation models
const Cour = require("./models/cours");
const User = require("./models/user");


// confi body-parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
  });

// Session Configuration
const secretKey = 'Croco23';
app.use(session({
secret: secretKey,
saveUninitialized : true,
}));

// DB simulation 
// let coursTab = [{
//     id: 1, name: "francais", nbrH: 35, coef: 10
// },
// { id: 2, name: "anglais", nbrH: 35, coef: 7 }];


app.post("/api/cours", (req, res) => {
  console.log("hereeeeeeeee intooooo BL ADD cours");
  
  let newCours = new Cours({
    name: req.body.name,
    coef: req.body.coef,
    nbrH: req.body.nbrH,
    TeacherID: req.body.TeacherID,
  });

  newCours.save()
    .then(savedCours => {
      console.log("Cours saved:", savedCours);
      res.status(201).json({
        message: "Course added successfully",
        cours: savedCours,
      });
    })
    .catch(error => {
      console.error("Error saving Cours:", error);
      res.status(500).json({ error: "Failed to save Course" });
    });
});

//   app.post("/api/cours", (req, res) => {

//     console.log("here into BL: add cours", req.body);
//     let c= new Cour (req.body);
//    c.save(); 
//     res.json({ msg: "added with succes" })
// })

// ShortCut path
app.use('/myFiles', express.static(path.join('backend/images')));
app.use('/files', express.static(path.join('backend/files')))

// media types
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf' :'pdf'

}

const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        if (file.mimetype==='application/pdf') {
          cb(null, 'backend/files')
          
        } else {
          cb(null,'backend/images')
        }
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});

// app.post("/api/users/signupAdmin", multer({ storage: storageConfig }).single('img'), (req, res) => {

//   console.log("here into BL: add user", req.body);
//   bcrypt.hash(req.body.pwd, 8).then((cryptePwd) => {
//       console.log("here crypted Pwd", cryptePwd);
//       req.body.pwd = cryptePwd;
//       req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
//       let user = new User(req.body);
//       user.save((err, doc) => {
//           console.log("here error", err);
//           console.log("here document", doc);
//           err ? res.json({ message: "error" }) : res.json({ message: "added with succes" });
//       });
//   })
// })

app.post("/api/users/signupAdmin", async (req, res) => {
  try {
    const cryptedPwd = await bcrypt.hash(req.body.pwd, 8);
    console.log("here Crypted PWD", cryptedPwd);
    req.body.pwd = cryptedPwd;
    // Check if the number or email already exists in the collection
    const existingUser = await User.findOne({
      $or: [{ number: req.body.number }, { email: req.body.email }]
    });

    if (existingUser) {
      // If either the number or email already exists, respond with an error
      console.log("The provided number or email is already in use.");
      return res.status(400).json({ msg: "The provided number or email is already in use." });
    }
    const user = new User(req.body);
    await user.save();
    res.json({ msg: "Admin Added with success" });
  } catch (error) {
    console.error("here error", error);
    res.json({ msg: "Error" });
  }
});

app.post("/api/users/signup", multer({ storage: storageConfig }).single('img'), (req, res) => {

  console.log("here into BL: add user", req.body);
  bcrypt.hash(req.body.pwd, 8).then((cryptePwd) => {
      console.log("here crypted Pwd", cryptePwd);
      req.body.pwd = cryptePwd;
      req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
      let user = new User(req.body);
      user.save((err, doc) => {
          console.log("here error", err);
          console.log("here document", doc);
          err ? res.json({ message: "error" }) : res.json({ message: "added with succes" });
      });
  })
})
app.post("/api/users/signup", multer({ storage: storageConfig }).single('img'), async (req, res) => {
  try {
    console.log("Here into signup student", req.body);
    const cryptedPwd = await bcrypt.hash(req.body.pwd, 8);
    console.log("here Crypted PWD", cryptedPwd);
    req.body.pwd = cryptedPwd;
    req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
    
    // Check if the number or email already exists in the collection
    const existingUser = await User.findOne({
      $or: [{ number: req.body.number }, { email: req.body.email }]
    });

    if (existingUser) {
      // If either the number or email already exists, respond with an error
      console.log("The provided number or email is already in use.");
      return res.status(400).json({ msg: "The provided number or email is already in use." });
    }

    // If the number and email are not found, create a new user and save it
    const user = new User(req.body);
    await user.save();
    console.log("stundent added with success");
    res.json({ msg: "stundent Added with success" });
  } catch (error) {
    console.error("Error saving stundent:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// app.post("/api/users/signupTeacher", multer({ storage: storageConfig }).single('pdf'), (req, res) => {

//   console.log("here into BL: add user", req.body);
//   bcrypt.hash(req.body.pwd, 8).then((cryptePwd) => {
//       console.log("here crypted Pwd", cryptePwd);
//       req.body.pwd = cryptePwd;
//       req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
//       let user = new User(req.body);
//       user.save((err, doc) => {
//           console.log("here error", err);
//           console.log("here document", doc);
//           err ? res.json({ message: "error" }) : res.json({ message: "added with succes" });
//       });
//   })
// })

app.post("/api/users/signupTeacher", multer({ storage: storageConfig }).single('pdf'), async (req, res) => {
  try {
    console.log(req.body);
    const cryptedPwd = await bcrypt.hash(req.body.pwd, 8);
    console.log("here Crypted PWD", cryptedPwd);
    req.body.pwd = cryptedPwd;
    req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`;
    
    // Check if the number or email already exists in the collection
    const existingUser = await User.findOne({
      $or: [{ number: req.body.number }, { email: req.body.email }]
    });

    if (existingUser) {
      // If either the number or email already exists, respond with an error
      console.log("The provided number or email is already in use.");
      return res.status(400).json({ msg: "The provided number or email is already in use." });
    }

    // If the number and email are not found, create a new user and save it
    const user = new User(req.body);
    await user.save();
    console.log("teacher added with success");
    res.json({ msg: "teacher Added with success" });
  } catch (error) {
    console.error("Error saving teacher:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

app.post("/api/users/login", (req, res) => {

  console.log("here into BL: add user", req.body);
  let user;
  User.findOne({ email: req.body.email }).then((doc) => {
      console.log("here doc", doc);
      user = doc;
      if (!doc) {
          res.json({ msg: "please check u email" });

      } else {
          return bcrypt.compare(req.body.pwd, doc.pwd)
      }
  })
      .then((isEqual) => {
          console.log("here isEqual", isEqual);
          if (!isEqual) {
              res.json({ msg: "please chech pwd" });
          } else {
              let userToSend = {
                  userId: user._id,
                  email: user.email,
                  fName: user.firstName,
                  lName: user.lastName,
              }
              res.json({ user: userToSend, msg: "welcome" })
          }
      })

})



















//   http://localhost:3000/matches

// app.get("/matches",(req,res)=>{

//     console.log("hereeeeeeeee intooooo get all matches");

//     res.status(200).json({
//         messnbrH:"helloo"
//     })

// })

// app.post("/matches",(req,res)=>{

//     console.log("raniii wselet");

// })

// app.put("/matches",(req,res)=>{

//     console.log("raniii wselet put");

// })
// make app importable to other files
module.exports = app