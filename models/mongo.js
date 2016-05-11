var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/STW5');
// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var userSchema = {
    "user" : String,
    "pass" : String
};
// create model if not exists.
module.exports = mongoose.model('users',userSchema); 