// import express module
const express = require("express");
// import body parser module
const bodyParser = require("body-parser");

// create app express
const app = express();

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


  const Cours = require("./models/cours");

// DB simulation 
let coursTab = [{
    id: 1, name: "francais", nbrH: 35, coef: 10
},
{ id: 2, name: "anglais", nbrH: 35, coef: 7 },];




  app.post("/api/cours", (req, res) => {

    console.log("here into BL: add cours", req.body);
    let c= new Cours (req.body);
   c.save(); 
    res.json({ msg: "added with succes" })
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