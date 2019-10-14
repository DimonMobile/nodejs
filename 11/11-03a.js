const WebSocket = require('ws');

let ws = new WebSocket('ws://localhost:4000');

ws.on('open', () => {
    console.log('opened');
});

ws.on('message', data => {
    console.log(data);
});

ws.on('close', () => {
    console.log('disconnected');
});

