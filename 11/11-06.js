const rpcWSS = require('rpc-websockets').Server;

let server = new rpcWSS({port: 4000, host: 'localhost'});

server.event('A');
server.event('B');
server.event('C');

process.stdin.on('data', p => {
    let dat = p.toString()[0];
    if (dat == 'a')
        server.emit('A');
    else if (dat == 'b')
        server.emit('B');
    else if (dat == 'c')
        server.emit('C');
});