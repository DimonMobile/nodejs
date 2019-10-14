const WebSocket = require('ws');

let wss = new WebSocket.Server({port: 4000, host: 'localhost'});

wss.on('connection', ws => {
    console.log('connected');
    ws.on('close', () => {
        console.log('disconnected');
    });
    ws.on('message', data => {
        console.log(`message: ${data}`)
    });
});

let n = 0;
function messageForAll() {
    ++n;
    wss.clients.forEach(ws => {
        ws.send(`11-03-server: ${n}`);
    });
}

function checkConnections() {
    let clients = 0;
    console.log('Clients checking...');
    wss.clients.forEach(ws => {
        ws.ping('Test');
        ws.once('pong', () => {
            ++clients;
        })
    });
    setTimeout(() => {
        console.log(`Connected: ${clients}`);
    }, 500);
}

setInterval(checkConnections, 5000);
setInterval(messageForAll, 15 * 1000);