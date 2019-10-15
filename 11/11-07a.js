const rpcWSC = require('rpc-websockets').Client;

let ws = new rpcWSC('ws://localhost:4000');

process.stdin.on('data', data => {
    ws.notify('A', {text: data.toString().trim()});
});

