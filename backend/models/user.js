const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    pwd: String,
    number:{ type: String,unique:true},
    cours:String,
    role:String,
    status:String,
    avatar :String
})

const user = mongoose.model("User", userSchema);

module.exports = user;