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

/* variables */
var url = 'mongodb://127.0.0.1:27017/stw4';
var connection;
var salt;


module.exports = {

    /**
     * Crea la conexion con la base de datos
     * @param callback
     */
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

    /**
     * Añade una nota a la coleccion notas
     * @param fecha
     * @param texto
     * @param fichero
     * @param callback
     */
    addNote: function (fecha,texto,fichero,callback) {
        connection.collection('notes').insert({'fecha':fecha,'texto':texto,'fichero':fichero},function (err,res) {
            if(err) throw err;
            callback(res);
        })
    },

    /**
     * Devuelve todos los elementos de la coleccion notas
     * @param callback
     * @constructor
     */
    FindAll: function (callback) {
        connection.collection('notes').find().toArray(function (err,res) {
            if(err) throw err;
            callback(res); 
        });
    },

    /**
     * Devuelve la nota identificada por el parametro _id
     * @param _id
     * @param callback
     * @constructor
     */
    FindByID: function (_id,callback) {
        connection.collection('notes').find({'_id':ObjectID(_id)}).toArray(function (err,res) {
            if(err) throw err;
            callback(res);
        });
    },


    /**
     * Borra la nota identificada por el parametro _id
     * @param _id
     * @param callback
     * @constructor
     */
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


    /**
     * Devuelve el numero de notas que comparten el parametro fichero
     * @param fichero
     * @param callback
     */
    isUsed: function (fichero, callback) {
        connection.collection('notes').find({'fichero':fichero}).toArray(function (err,res) {
            if(err) throw err;
            callback(res.length);
        });
    },

    /**
     * Anade un usuario a la coleecion usuario. Los passwords se encrytan a la hora de insertarlos en la base de datos.
     * @param user
     * @param pass
     * @param callback
     */
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

    /**
     * Para los parametros user y pass, valida si ese nombre de usuario existe y tiene asociado ese password
     * @param user
     * @param pass
     * @param callback
     */
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

    /**
     * Comprueba si existe uno o varios usuarios coindicentes con el parametro user
     * @param user
     * @param callback
     */
    existsUser: function (user,callback) {
        connection.collection('users').find({'user': user}).toArray(function (err, res) {
            if (err) throw err;
            callback(res);
        });
    },

}





