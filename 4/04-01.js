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
    req.on('data', (chunk) => {
        let data = JSON.parse(chunk);
        db.update(data);

        res.writeHead(200, {'Content-type': 'text/plain'});
        res.end('ok');
    });
});

db.on('DELETE', (req, res) => {
    let queryId = url.parse(req.url, true).query.id;
    if (typeof queryId != 'undefined') {
        queryId = parseInt(queryId);
        console.log('Deleted ' + queryId);
        db.delete(queryId);
    }

    res.writeHead(200, {'Content-type': 'text/plain'});
    res.end('ok');
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