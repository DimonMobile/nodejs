const WebSocket = require('ws');
const fs = require('fs');

let ws = new WebSocket('ws://localhost:4000');
ws.on('open', () => {
    let wStream = fs.createWriteStream(`download/downloaded.txt`);
    let rStream = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    rStream.pipe(wStream);
});