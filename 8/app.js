let http = require('http');
let url = require('url');


let server = http.createServer(function(req, resp) {
    let parsedUrl = url.parse(req.url, true)
    if (parsedUrl.pathname === '/connection') {
        if (parsedUrl.query.set == undefined){
            resp.writeHead(200, {'Content-type': 'text/plain'});
            resp.end(server.keepAliveTimeout.toString());
        } else {
            server.keepAliveTimeout = parseInt(parsedUrl.query.set);
            resp.writeHead(200, {'Content-type': 'text/plain'});
            resp.end(`Updated to ${server.keepAliveTimeout}`);
        }
    }
}).listen(5000);

console.log('http://localhost:5000');