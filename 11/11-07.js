const rpcWSS = require('rpc-websockets').Server;

let server = new rpcWSS({host: 'localhost', port: '4000'});

server.register('A', (params) => {
    console.log(params.text);
});