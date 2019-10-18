const net = require('net');

let sock = net.connect(40000, 'localhost', () => {
    console.log('Connected');
    sock.write('Test');
});

sock.on('data', data => {
    console.log(data.toString());
    sock.destroy();
});

sock.on('close', () => {
    console.log('disconnected');
});

sock.on('error', (err) => {
    console.log(err.message);
});