const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://test:" + encodeURIComponent("qwaszx@1") + "@cluster0-hogph.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const http = require('http');



client.connect(err => {
    if (err) console.log('DB connection error:', err);
    const db = client.db("bstu");
    const pulpitCollection = db.collection("pulpit");

    http.createServer((request, response) => {

        let splitted = request.url.split('/');

        if (request.url.startsWith('/api/faculties')) {
            if (request.method === 'GET') {
                db.collection("faculty").find().toArray((err, docs) => {
                    if (err) {
                        response.writeHead(500, { 'Content-type': 'application/json' });
                        response.end(err.message);
                    } else {
                        response.writeHead(200, { 'Content-type': 'application/json' });
                        response.end(JSON.stringify(docs));
                    }
                });
            } else if (request.method === 'POST') {
                let data = '';
                request.on('data', chunk => {
                    data += chunk;
                });
                request.on('end', () => {
                    db.collection("faculty").insertOne(JSON.parse(data), (err, r) => {
                        if (err) {
                            response.writeHead(500, { 'Content-type': 'text/plain' });
                            response.end(err.message);
                        } else {
                            response.writeHead(200, { 'Content-type': 'application/json' });
                            response.end(data);
                        }
                    });
                });
            } else if (request.method === 'DELETE') {
                if (splitted.length < 4) {
                    response.writeHead(400, { 'Content-type': 'text/plain' });
                    response.end('No id');
                } else {
                    response.writeHead(200, { 'Content-type': 'text/plain' });
                    db.collection("faculty").findOneAndDelete({ faculty: splitted[3] }, (err, r) => {
                        if (err) {
                            response.writeHead(400, { 'Content-type': 'text/plain' });
                            response.end(err.message);
                        } else {
                            response.writeHead(200, { 'Content-type': 'application/json' });
                            response.end(JSON.stringify(r.value));
                        }
                    });
                }
            } else if (request.method === 'PUT') {
                let data = '';
                request.on('data', chunk => {
                    data += chunk;
                });
                request.on('end', () => {
                    let parsed = JSON.parse(data);
                    db.collection("faculty").findOneAndReplace({faculty: parsed.faculty}, parsed, (err, r) => {
                        if (err) {
                            response.writeHead(500, { 'Content-type': 'text/plain' });
                            response.end(err.message);
                        } else {
                            response.writeHead(200, { 'Content-type': 'application/json' });
                            response.end(data);
                        }
                    });
                });
            }
        } else if (request.url.startsWith('/api/pulpits')) {
            if (request.method === 'GET') {
                db.collection("pulpit").find().toArray((err, docs) => {
                    if (err) {
                        response.writeHead(500, { 'Content-type': 'application/json' });
                        response.end(err.message);
                    } else {
                        response.writeHead(200, { 'Content-type': 'application/json' });
                        response.end(JSON.stringify(docs));
                    }
                });
            } else if (request.method === 'POST') {
                let data = '';
                request.on('data', chunk => {
                    data += chunk;
                });
                request.on('end', () => {
                    db.collection("pulpit").insertOne(JSON.parse(data), (err, r) => {
                        if (err) {
                            response.writeHead(500, { 'Content-type': 'text/plain' });
                            response.end(err.message);
                        } else {
                            response.writeHead(200, { 'Content-type': 'application/json' });
                            response.end(data);
                        }
                    });
                });
            } else if (request.method === 'DELETE') {
                if (splitted.length < 4) {
                    response.writeHead(400, { 'Content-type': 'text/plain' });
                    response.end('No id');
                } else {
                    response.writeHead(200, { 'Content-type': 'text/plain' });
                    db.collection("pulpit").findOneAndDelete({ pulpit: splitted[3] }, (err, r) => {
                        if (err) {
                            response.writeHead(400, { 'Content-type': 'text/plain' });
                            response.end(err.message);
                        } else {
                            response.writeHead(200, { 'Content-type': 'application/json' });
                            response.end(JSON.stringify(r.value));
                        }
                    });
                }
            } else if (request.method === 'PUT') {
                let data = '';
                request.on('data', chunk => {
                    data += chunk;
                });
                request.on('end', () => {
                    let parsed = JSON.parse(data);
                    db.collection("pulpit").findOneAndReplace({pulpit: parsed.pulpit}, parsed, (err, r) => {
                        if (err) {
                            response.writeHead(500, { 'Content-type': 'text/plain' });
                            response.end(err.message);
                        } else {
                            response.writeHead(200, { 'Content-type': 'application/json' });
                            response.end(data);
                        }
                    });
                });
            }
        }
    }).listen(3000);

});