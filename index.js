/**
 * Autor: Alejandro Solanas Bonilla
 * NIA: 647647
 * Fichero: index.js
 * Fecha: 21/4/2016
 * Funcion: Main de la aplicación, carga los modulos necesarios y llama al server
 */


var server = require("./controllers/server");
var router = require("./controllers/router");
var requestHandlers = require("./controllers/requestHandlers");

var handle = {};
handle["/"] = requestHandlers.home;
handle["/setMemo"] = requestHandlers.setMemo;
handle["/deleteMemo"] = requestHandlers.deleteMemo;
handle["/showAllMemo"] = requestHandlers.show;
handle["/showMemo"] = requestHandlers.showMemo;
handle["/login"] = requestHandlers.login;
handle["/register"] = requestHandlers.register;
server.start(router.route, handle);