let nodemailer = require('nodemailer');
let http = require('http');
let fs = require('fs');
let url = require('url');
let soap = require('./m0603');

let sendmail = require('sendmail')();
// sendmail({
//     from: 'bbddimonmobile@yandex.ru',
//     to: 'mobik.dimka@gmail.com',
//     subject: 'kek',
//     html: '<h1>HTML!</h1>'
// });

http.createServer((request, response) => {
    let html = fs.readFileSync('index.html');
    if (request.method == 'GET') {
        let parsedUrl = url.parse(request.url, true);
        let to = parsedUrl.query.to;
        let password = parsedUrl.query.password;
        let message = parsedUrl.query.message;
        if (message != undefined)
            console.log(soap.send(message), 'was sent');

        // console.log(to, password, message);
        // if (to != undefined) {
        //     let transport = nodemailer.createTransport({
        //         host: 'smpt.mail.ru',
        //         port: 465,
        //         secure: true,
        //         auth: {
        //             user: 'mobile.dimon@mail.ru',
        //             pass: password
        //         }
        //     });
        //     transport.sendMail({
        //         from: 'mobile.dimon@mail.ru',
        //         to: to,
        //         subject: 'test subject',
        //         html: message
        //     });
        // }
    }
    response.writeHead(200, { "Content-type": "text/html" });
    response.end(html);
}).listen(5000);
console.log("http://localhost:5000");