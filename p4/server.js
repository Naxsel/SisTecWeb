/**
 * Autor: Alejandro Solanas Bonilla
 * NIA: 647647
 * Fichero: server.js
 * Fecha: 21/4/2016
 * Funcion: Inicializa el servidor http y la conexion con la base de datos.
 */

'use strict';
var http = require("http");
var url = require("url");
var db = require('./mongodb-connector');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }
    db.connect(function (err) {
        if (err) throw error("Error al conectar con la base de datos");
        http.createServer(onRequest).listen(8081);
        console.log("Secondary server has started on port 8081.");
    });

}
exports.start = start;

