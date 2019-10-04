http = require('http');
qs = require('querystring');

let params = qs.stringify({x: 25, y: 5, s: 'kek'});

const options = {
    method: 'POST',
    host: 'localhost',
    path: '/json',
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
        let json = JSON.parse(data);
        console.log('comment:', json.__comment);
        console.log('sum:', json.x_plus_y);
        console.log('conc:', json.Concatenation_s_o);
        console.log('length:', json.Length_m);
    });
});

let json = {
    __comment: 'Запрос. kek',
    x: 3,
    y: 5,
    o: {
        name: 'Иван',
        surname: 'Иванов'
    },
    m: [1, 2, 3, 4]
}

req.write(JSON.stringify(json));
req.end();