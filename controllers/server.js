/**
 * Autor: Alejandro Solanas Bonilla
 * NIA: 647647
 * Fichero: server.js
 * Fecha: 17/4/2016
 * Funcion: Inicializa el servidor http
 */

var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }
    http.createServer(onRequest).listen(8080);
    console.log("Server has started.");
}
exports.start = start;


