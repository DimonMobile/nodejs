const net = require('net');

let sock = net.connect(parseInt(process.argv[2]), '127.0.0.1', () => {
    let interval = setInterval(() => {
        let buf = Buffer.alloc(4);
        let value = Math.round(Math.random() * 100);
        buf.writeInt32LE(value);
        sock.write(buf);
        console.log(`>Sent ${value}`);
    }, 1000);

    let timeout = setTimeout(() => {
        clearInterval(interval);
        sock.end();
    }, 20000);

    sock.on('data', data => {
        console.log(data.toString());
    });

    sock.on('error', err => {
        console.error(err.message);
    });
});