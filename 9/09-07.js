http = require('http');
fs = require('fs');

let bound = '--321312';
let body =  `--${bound}\r\n`;
    body += 'Content-Disposition: form-data; name="file"; filename="kek.png"\r\n';
    body += 'Content-Type: image/png\r\n\r\n';
    body += fs.readFileSync('Capture.png', 'binary');
    body += `\r\n--${bound}--\r\n\r\n`;

const options = {
    method: 'POST',
    host: 'localhost',
    path: '/upload',
    port: 5000,
    headers: {
        'Content-Type': 'multipart/form-data; boundary=' + bound,
        'Accept': 'multipart/form-data'
    }
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
    console.log(e.message);
});
req.end(body, 'binary');