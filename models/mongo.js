/**
 * Autor: Alejandro Solanas Bonilla
 * NIA: 647647
 * Fichero: mongo.js
 * Fecha: 12/5/2016
 * Funcion: Modelo y conector de mongoose para mongodb
 */

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