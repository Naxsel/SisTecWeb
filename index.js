var server = require("./controllers/server");
var router = require("./controllers/router");
var requestHandlers = require("./controllers/requestHandlers");
var database = require("./controllers/mysql-connector");

var handle = {};
handle["/"] = requestHandlers.show;
handle["/setMemo"] = requestHandlers.set;
handle["/deleteMemo"] = requestHandlers.delete;
handle["/showAllMemo"] = requestHandlers.show;
handle["/showAllMemo/showMemo"] = requestHandlers.showOne;
server.start(router.route, handle, database);