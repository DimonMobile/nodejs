http = require('http');
qs = require('querystring');

let params = qs.stringify({x: 25, y: 5, s: 'kek'});

const options = {
    method: 'POST',
    host: 'localhost',
    path: '/req-data',
    port: 5000
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
req.write(params);
req.end();