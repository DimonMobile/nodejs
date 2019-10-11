let http = require('http');
let fs = require('fs');
let WebSocket = require('ws');

const wsserver = new WebSocket.Server({port: 4000, host: 'localhost', path: '/wsserver'});

http.createServer(function(req, res) {
    if (req.url == '/start') {
        res.writeHead(200, {'Content-type': 'text/html'});

        fs.readFile('10-01.html', (err, data) => {
            res.end(data);
        });
    } else {
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.end('404 error');
    }
}).listen(3000);

wsserver.on('connection', (ws) => {
    let n = 0;
    let k = 0;
    setInterval(function(){
        ws.send(`10-01-server: ${n}->${++k}`);
    }, 5000);
    ws.on('message', message => {
        console.log(message);
        let messageList = message.split(' ');
        n = parseInt(messageList[messageList.length - 1]);
    });
});

console.log('http://127.0.0.1:3000');