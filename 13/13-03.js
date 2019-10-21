const net = require('net');

net.createServer(socket => {
    console.log('Connected');
    
    let sum = 0;
    let interval = setInterval(() => {
        let buf = Buffer.alloc(4);
        buf.writeInt32LE(sum, 0);
        socket.write(buf);
        sum = 0;
    }, 5000);

    socket.on('error', err => {
        console.error(err.message);
    });

    socket.on('close', () => {
        console.log('Disconnected');
        clearInterval(interval);
    });

    socket.on('data', data => {
        console.log(data);
        sum += data.readInt32LE();
    });

}).listen(40000, '127.0.0.1');