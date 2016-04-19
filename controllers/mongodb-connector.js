/**
 * Autor: Alejandro Solanas Bonilla
 * NIA: 647647
 * Fichero: mongoInit.js
 * Fecha: 18/4/2016
 * Funcion: Prepara la base de datos para el correcto funcionamiento del programa
 *          Crea las 2 colecciones e inserta unos datos de prueba
 *          http://tphangout.com/how-to-encrypt-passwords-or-other-data-before-saving-it-in-mongodb/
 */

'use strict';
var MongoClient = require('mongodb').MongoClient;
var ObjectID    = require('mongodb').ObjectID;
var bcrypt      = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var url = 'mongodb://127.0.0.1:27017/stw4';
var connection;


module.exports = {

    connect: function (callback) {
        MongoClient.connect(url, function (err,db) {
            connection = db;
            return callback(err);
        });
    },

    addNote: function (fecha,texto,fichero,callback) {
        connection.collection('notes').insert({'fecha':fecha,'texto':texto,'fichero':fichero},function (err,res) {
            if(err) throw err;
            callback(res);
        })
    },

    FindAll: function (callback) {
        connection.collection('notes').find().toArray(function (err,res) {
            if(err) throw err;
            callback(res); 
        });
    },


    FindByID: function (_id,callback) {
        connection.collection('notes').find({'_id':ObjectID(_id)}).toArray(function (err,res) {
            if(err) throw err;
            callback(res);
        });
    },


    DeleteByID: function (_id,callback) {
        console.log(_id);
        var id = new ObjectID(_id);
        console.log(id);
        connection.collection('notes').remove({'_id':id},function (err,res) {
            if(err) throw err;
            connection.collection('notes').find().toArray(function (err,res) {
                if(err) throw err;
                console.log(res);
            });
            callback(res);
        });
    },


    isUsed: function (fichero, callback) {
        connection.collection('notes').find({'fichero':fichero}).count(function (err,res) {
            if(err) throw err;
            console.log(res);
            callback(count);

        });
    },


    addUser: function () {

    },


    FindUser: function () {

    },


}





