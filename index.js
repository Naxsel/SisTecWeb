/**
 * Autor: Alejandro Solanas Bonilla
 * NIA: 647647
 * Fichero: index.js
 * Fecha: 17/4/2016
 * Funcion: Modulo inicial de la aplicacion
 */

var server = require("./controllers/server");
var router = require("./controllers/router");
var requestHandlers = require("./controllers/requestHandlers");

var handle = {};
handle["/"] = requestHandlers.show;
handle["/setMemo"] = requestHandlers.setMemo;
handle["/deleteMemo"] = requestHandlers.deleteMemo;
handle["/showAllMemo"] = requestHandlers.show;
handle["/showMemo"] = requestHandlers.showMemo;
server.start(router.route, handle);