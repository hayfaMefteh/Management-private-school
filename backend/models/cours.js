const mongoose = require("mongoose");

const courSchema = mongoose.Schema({
    coef: Number,
    teacherID: String,
    nbrH: Number,
    name: String
   
});

const cour = mongoose.model("Cours", courSchema);

module.exports = cour;