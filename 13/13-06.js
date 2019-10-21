const net = require('net');

let value = parseInt(process.argv[2]);

let sock = net.connect(40000, '127.0.0.1', () => {
    let interval = setInterval(() => {
        let buf = Buffer.alloc(4);
        buf.writeInt32LE(value);
        sock.write(buf);
        console.log(`>Sent ${value}`);
    }, 1000);

    let timeout = setTimeout(() => {
        clearInterval(interval);
        sock.end();
    }, 20000);

    sock.on('data', data => {
        let sum = data.readInt32LE();
        console.log(`<Sum: ${sum}`);
    });

    sock.on('error', err => {
        console.error(err.message);
    });
});