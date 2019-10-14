const WebSocket = require('ws');
const fs = require('fs');

let wss = new WebSocket.Server({port: 4000, host: 'localhost'});
wss.on('connection', ws => {
    let rStream = fs.createReadStream(`test.txt`);
    let duplex = WebSocket.createWebSocketStream(ws, {encoding:'utf-8'});
    rStream.pipe(duplex);
});
