/**
 * Autor: Alejandro Solanas Bonilla
 * NIA: 647647
 * Fichero: mongoInit.js
 * Fecha: 21/4/2016
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
var salt;


module.exports = {

    connect: function (callback) {
        MongoClient.connect(url, function (err,db) {
            connection = db;
                bcrypt.genSalt(SALT_WORK_FACTOR, function(err,_salt) {
                    if (err) return next(err);
                    salt = _salt;
                });
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
        connection.collection('notes').remove({'_id':ObjectID(_id)},function (err,res) {
            if(err) throw err;
            connection.collection('notes').find().toArray(function (err,res) {
                if(err) throw err;
                console.log(res);
            });
            callback(res);
        });
    },


    isUsed: function (fichero, callback) {
        connection.collection('notes').find({'fichero':fichero}).toArray(function (err,res) {
            if(err) throw err;
            callback(res.length);
        });
    },


    addUser: function (user,pass,callback) {
        bcrypt.hash(pass, salt, function(err,hash){
            if(err) throw err;
            pass=hash;
            connection.collection('users').insert({'user':user,'pass':pass},function (err,res) {
                if(err) throw err;
                callback(res);
            });
        });
    },


    validUser: function (user,pass,callback) {
        connection.collection('users').find({'user':user}).toArray(function (err,res) {
            if (err) throw err;
            console.log(res);
            if (res.length == 0) {
                console.log("User not Found");
                callback(false);
            } else {
                console.log(pass);
                console.log(res[0].pass);
                bcrypt.compare(pass, res[0].pass, function (err, res) {
                    console.log(res);
                    callback(res);
                });
            }
        });
    },

    existsUserID: function (id,callback) {
        connection.collection('users').find({'id': ObjectID(id)}).toArray(function (err, res) {
            if (err) throw err;
            callback(res);
        });
    },

    existsUser: function (user,callback) {
        connection.collection('users').find({'user': user}).toArray(function (err, res) {
            if (err) throw err;
            callback(res);
        });
    },

}





