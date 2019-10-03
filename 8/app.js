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
    } else if (parsedUrl.pathname == '/headers') {
        resp.writeHead(200, {'Content-type': 'text/plain', 'Custom': 'bla-bla'});
        let result = '';
        Object.entries(req.headers).forEach(element => {
            result += element[0] + ': ' + element[1] + '\n';
        });

        resp.end(result);
    }
}).listen(5000);

console.log('http://localhost:5000');