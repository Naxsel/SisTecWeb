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