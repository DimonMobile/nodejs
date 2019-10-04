http = require('http');

let options = {
    host: 'localhost',
    path: '/connection',
    port: 5000,
    method: 'GET'
}

const req = http.request(options, (res) => {
    console.log('Method:', req.method);
    console.log('StatusCode:', res.statusCode);
    console.log('StatusMessage', res.statusMessage);
    console.log('Address:', res.connection.remoteAddress);
    console.log('Port:', res.connection.remotePort);
    console.log('---data---');
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log(data);
    });
});
req.on('error', (e) => {
    console.log('Error', e.message);
});
req.end();