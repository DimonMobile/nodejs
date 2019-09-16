var http = require('http');
var data = require('./data');

var port = 5000;

var db = new data.DB();

db.on('GET', (req, res) => {console.log('DB.GET');});
db.on('POST', (req, res) => {console.log('DB.POST');});
db.on('PUT', (req, res) => {console.log('DB.PUT');});
db.on('DELETE', (req, res) => {console.log('DB.DELETE');});

http.createServer((request, response) => {
    response.writeHead(200, {'Content-type': 'text/html'});
    db.emit(request.method, request, response);

    response.end(`<h1>Hello</h1>`);
}).listen(5000);
console.log('server running at http://127.0.0.1:5000');