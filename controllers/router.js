var fs = require('fs');

function route(handle, pathname, response, request) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    }else if(pathname.startsWith("/ficheros")){
        var output = fs.createReadStream("."+pathname);
        output.on('open',function(){
            response.writeHead(200,{"Content-Type":"application/octet-stream"});
            output.pipe(response);
        })
    }else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not found");
        response.end();
    }
}
exports.route = route;