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
    } else if (parsedUrl.pathname == '/parameter') {
        resp.writeHead(200, {'Content-type': 'text/plain'});
        let value1 = parsedUrl.query.x;
        let value2 = parsedUrl.query.y;
        
        try {
            if (value1 == undefined || value2 == undefined) 
                throw Error('x or y not passed');

            let x = parseInt(value1);
            let y = parseInt(value2);
            if (isNaN(value1) || isNaN(value2))
                throw Error('x or y is not a number');
            resp.end(`x + y = ${x + y}\nx - y = ${x - y}\nx * y = ${x * y}\nx / y = ${x / y}`);
        } catch (e) {
            resp.end(e.toString());
        }
    }
}).listen(5000);

console.log('http://localhost:5000');