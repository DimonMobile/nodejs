http = require('http');
url = require('url');
static = require('./m07-01')('static');

http.createServer(function(request, response) {
    if (request.method == 'GET') {
        static.processStatic(url.parse(request.url).pathname, response);
    } else {
        response.writeHead(405, {'Content-type': 'text/plain'});
        response.end('((((');
    }
}).listen(5000);
console.log('http://localhost:5000');