let http = require('http');
let url = require('url');
let qs = require('querystring');
let fs = require('fs');


let server = http.createServer(function(req, resp) {
    let parsedUrl = url.parse(req.url, true)
    let pathUrls = parsedUrl.pathname.split('/');
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
    } else if (pathUrls[1] === 'parameter') {
        try {
            if (pathUrls.length != 4) 
                throw Error('Invalid param count');
            let x = pathUrls[2];
            let y = pathUrls[3];
            if (x == undefined || y == undefined)
                throw Error('Something wrong');
            x = parseInt(x);
            y = parseInt(y);
            if (isNaN(x) || isNaN(y))
                throw Error('Args is nans!');
            
            resp.end(`x + y = ${x + y}\nx - y = ${x - y}\nx * y = ${x * y}\nx / y = ${x / y}`);
        } catch (e) {
            resp.end(e.toString());
        }
    } else if (parsedUrl.pathname == '/close') {
        resp.writeHead(200, {'Content-type': 'text/plain'});
        resp.end('Server will die in 10 seconds!\n');
        setTimeout(() => {
            server.close()
        }, 10000);
    } else if (parsedUrl.pathname == '/socket') {
        resp.writeHead(200, {'Content-type': 'text/plain'});
        resp.end(req.connection.remoteAddress + ':' + req.connection.remotePort);
    } else if (parsedUrl.pathname == '/req-data') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            let o = qs.parse(data);
            let result = '';
            for(let key in o) {
                result += `${key} = ${o[key]}\n`;
            }
            resp.writeHead(200, {'Content-type': 'text/plain; charset=utf-8'});
            resp.end(result);
        });
    } else if (parsedUrl.pathname == '/resp-status') {
        try {
            let code = parsedUrl.query.code;
            let mess = parsedUrl.query.mess;
            if (code == undefined || mess == undefined)
                throw Error('Params error');

            code = parseInt(code);
            if (isNaN(code))
                throw Error('passed code is nan');

            resp.writeHead(code, {'Content-type': 'text/plain'});
            resp.statusMessage = mess;
            resp.end('Yeah!');
        } catch (e) {
            resp.writeHead(200, {'Content-type': 'text/plain'});
            resp.end(e.toString());
        }
    } else if (parsedUrl.pathname == '/formparameter') {
        if (req.method == 'GET') {
            resp.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            resp.end('<head><meta charset="utf-8"></head><form method="POST" action="req-data"><input type="text" name="first" /><input name="kek" type="submit" value="first" /><input name="kekalka" type="submit" /></form>');
        } else if (req.method == 'POST') {

        }
    } else if (parsedUrl.pathname == '/json') {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            data = JSON.parse(data);
            resp.writeHead(200, {'Content-type': 'application/json; charset=utf-8'});
            let comment = 'Ответ.' + data.__comment.split('.')[1];
            let response = {};
            response.__comment = comment;
            response.x_plus_y = data.x + data.y;
            response.Concatenation_s_o = data.o.surname + ', ' + data.o.name;
            response.Length_m = data.m.length;
            resp.end(JSON.stringify(response));
        });
    }
}).listen(5000);

console.log('http://localhost:5000');