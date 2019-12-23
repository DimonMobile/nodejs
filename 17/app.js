const redis = require('redis');
const creds = require('./creds');

const client_1 = creds.getFreshClient();
const client_2 = creds.getFreshClient();

client_1.subscribe('kek', (err, result) => {
    if (err) {
        console.error(`Error: ${err.message}`);
    }
});

client_1.on('subscribe', (channel, count) => {
    console.log(`client_1 subscribed; channel = ${channel}; count = ${count}`);
    console.log('client_2 published');
    client_2.publish('kek', 'Aday almazi');
});

client_1.on('message', (channel, message) => {
    console.log(`client_1 message; channel = ${channel}; message = ${message}`);
    client_1.quit();
    client_2.quit();
});