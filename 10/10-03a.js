const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000/broadcast');

ws.on('open', () => {
    console.log('connected');
});
ws.on('message', (message) => {
    console.log(`Message from server: ${message}`);
});