const WebSocket = require('ws');

let wss = new WebSocket.Server({port: 4000, host: 'localhost'});

let n = 0;
wss.on('connection', (ws) => {
    ws.on('message', data => {
        let jsonObject = JSON.parse(data);
        jsonObject.server = ++n;
        ws.send(JSON.stringify(jsonObject));
    });
});