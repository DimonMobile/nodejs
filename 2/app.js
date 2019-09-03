var http = require('http');
var fs = require('fs');

const server = http.createServer((request, response) => {
    if (request.url == '/') {
        response.writeHead(200, {'Content-type': 'text/html'});
        response.end("<a href='/html'>/html</a><br>" + 
                     "<a href='/png'>/png</a><br>" + 
                     "<a href='/api/name'>/api/name</a><br>");
    } else if (request.url == '/html') {
        let html = fs.readFileSync("./index.html");
        response.writeHead(200, {'Content-type': 'text/html'});
        response.end(html);
    } else if (request.url == '/api/name') {
        response.writeHead(200, {'Content-type': 'text/plain; charset=utf-8'});
        response.end('Дмитрий Плотников')
    } else if (request.url == '/png'){
        let picturePath = './pic.png';
        fs.stat(picturePath, (err, stat) => {
            if (err) {console.log(err)}
            else {
                let jpg = fs.readFileSync(picturePath);
                response.writeHead(200, {'Content-type': 'image/png', 'Content-length': stat.size});
                response.end(jpg, 'binary');
            }
        });
    } else {
        response.writeHead(404, {'Content-type': 'text/html'});
        response.end("<h1>404 Error</h1>")
    }
}).listen(3000);

console.log('Server running at http://localhost:3000');