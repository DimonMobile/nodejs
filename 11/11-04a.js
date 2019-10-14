const WebSocket = require('ws');

let ws = new WebSocket('ws://localhost:4000');
let x = process.argv.slice(2)[0];
ws.on('open', () => {
    let dataObject = {client: x, timestamp: new Date().toISOString()};
    ws.send(JSON.stringify(dataObject));
    ws.on('message', data => {
        console.log(data);
        ws.close();
    });
});