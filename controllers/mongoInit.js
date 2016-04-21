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
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

MongoClient.connect(
    'mongodb://127.0.0.1:27017/stw4',
    function(err, db) {
        if (err) throw err;
        else {
            console.log("Conectado, procediendo...");
            db.collection('notes').drop();
            db.collection('users').drop();
            db.createCollection('notes', function (err, collection) {
                collection.insert({
                    'fecha': '1970-01-01',
                    'texto': 'Prueba',
                    'fichero': 'nodejs-light.png'
                }, function (err, res) {
                    if (err) return next(err);
                    db.createCollection('users', function (err, collection) {
                        var usuario = {'user': 'admin', 'password': 'test1'};
                        bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt) {
                            if(err) return next(err);
                            bcrypt.hash(usuario.password, salt, function(err,hash){
                                if (err) return next(err);
                                usuario.password = hash;
                                collection.insert(usuario, function (err, res) {
                                    if (err) console.log(error);
                                    console.log("Datos creados, disponible usuario\n\tuser: admin\n\tpass: test1")
                                    db.close();
                                });
                            });
                        });
                    });
                });
            });
        }
    });