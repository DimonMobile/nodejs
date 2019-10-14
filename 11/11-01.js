const WebSocket = require('ws');
const fs = require('fs');

const wsserver = new WebSocket.Server({port: 4000, host: 'localhost'});
let k = 0;
wsserver.on('connection', ws => {
    console.log('connected');
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
    let wfile = fs.createWriteStream(`upload/file${++k}.txt`);
    duplex.pipe(wfile);
});