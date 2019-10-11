const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 5000, host: 'localhost', path:'/broadcast'});
let globalIdx = 0;

setInterval(function() {
    wss.clients.forEach(p => {
        p.send(`Broadcast message ${++globalIdx}`);
    });
}, 5000);

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});