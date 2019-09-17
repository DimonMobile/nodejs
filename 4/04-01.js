var http = require('http');
var data = require('./data');
var fs = require('fs');
var url = require('url');

var port = 5000;
var db = new data.DB();

db.on('GET', (req, res) => {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(db.select()));
});

db.on('POST', (req, res) => {
    req.on('data', (chunk) => {
        let data = JSON.parse(chunk);
        db.insert(data);

        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(data));
    });
});

db.on('PUT', (req, res) => {
    console.log('DB.PUT');
});

db.on('DELETE', (req, res) => {
    console.log('DB.DELETE');
});


http.createServer((request, response) => {
    const pathName = url.parse(request.url).pathname;
    if (pathName == '/api/db') {
        db.emit(request.method, request, response);
    } else if (pathName == '/') {
        let html = fs.readFileSync('./index.html');
        response.writeHead(200, {'Content-type': 'text/html'});
        response.end(html);
    }
}).listen(5000);

console.log(`server running at http://127.0.0.1:${port}`);