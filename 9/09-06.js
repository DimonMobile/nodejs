http = require('http');

let bound = '--321312';
let body =  `--${bound}\r\n`;
    body += 'Content-Disposition: form-data; name="file"; filename="MyFile.txt"\r\n';
    body += 'Content-Type: text/plain\r\n\r\n';
    body += '111\n222222\n333\n444444';
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
req.end(body);