http = require('http');
qs = require('querystring');
xml = require('xml2js').parseString;
xmlBuilder = require('xmlbuilder');

let params = qs.stringify({x: 25, y: 5, s: 'kek'});

const options = {
    method: 'POST',
    host: 'localhost',
    path: '/xml',
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
        xml(data, (err, res) => {
            console.log('id:', res.response.$.id);
            console.log('x element:', res.response.sum[0].$.element);
            console.log('x sum:', res.response.sum[0].$.result);
            console.log('m element:', res.response.concat[0].$.element);
            console.log('m sum:', res.response.concat[0].$.result);
        });
    });
});

let xmlContent = xmlBuilder.create('request').att('id', 28);
xmlContent.ele('x').att('value', 10).up().ele('x').att('value', 20).up()
.ele('m').att('value', 'a');

console.log(xmlContent.toString());
req.write(xmlContent.toString());
req.end();