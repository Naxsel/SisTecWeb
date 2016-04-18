/**
 * Autor: Alejandro Solanas Bonilla
 * NIA: 647647
 * Fichero: mongoInit.js
 * Fecha: 17/4/2016
 * Funcion: Prepara la base de datos para el correcto funcionamiento del programa
 *          Crea las 2 colecciones e inserta unos datos de prueba
 */


'use strict';
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(
    'mongodb://127.0.0.1:27017/stw4',
    function(err, db) {
        if (err) throw err;
        else {
            console.log("Conectado, procediendo...")
            db.createCollection('notes', function (err, collection) {
                collection.insert({
                    'fecha': '01/01/1970',
                    'texto': 'Prueba',
                    'fichero': 'nodejs-light.png'
                }, function (err, res) {
                    if (err) console.log(error);
                    db.createCollection('users', function (err, collection) {
                        collection.insert({'user': 'admin', 'password': 'test1'}, function (err, res) {
                            if (err) console.log(error);
                            db.close();
                        });
                    });
                });
            });
        }
    });