/**
 * Autor: Alejandro Solanas Bonilla
 * NIA: 647647
 * Fichero: mongoInit.js
 * Fecha: 17/4/2016
 * Funcion: Prepara la base de datos para el correcto funcionamiento del programa
 *          Crea las 2 colecciones e inserta unos datos de prueba
 *          http://tphangout.com/how-to-encrypt-passwords-or-other-data-before-saving-it-in-mongodb/
 */

'use strict';
var MongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');


