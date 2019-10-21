const net = require('net');

const HOST = '127.0.0.1';

let host = (port) => {
    net.createServer(sock => {
        sock.on('data', data => {
            let readed = data.readInt32LE();
            sock.write(`Echo: ${readed.toString()}`);
        });

        sock.on('error', (err) => {
            console.error(err.message);
        });
    }).listen(port, '127.0.0.1');
}

host(40000);
host(50000);