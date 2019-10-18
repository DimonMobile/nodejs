const net = require('net');

net.createServer(sock => {
    console.log(`Client connected ${sock.remoteAddress}:${sock.remotePort}`);
    sock.on('data', data => {
        console.log('Client sent a message');
        sock.write('ECHO: ' + data.toString());
    });
    sock.on('close', is_err => {
        console.log('Disconnected');
    });
    sock.on('error', err => {
        console.log('Error ' + err.message);
    });
}).listen(40000, '0.0.0.0');