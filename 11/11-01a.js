const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:4000');

ws.on('open', () => {
    console.log('connected');
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    let file = fs.createReadStream('test.txt');
    file.pipe(duplex);
});