const mongoose = require("mongoose");

const coursSchema = mongoose.Schema({
    coef: Number,
    nbrH: Number,
    name: String,
   
})

const cours = mongoose.model("Cours", coursSchema);

module.exports = cours;