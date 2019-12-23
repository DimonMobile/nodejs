const redis = require('redis');
const creds = require('./creds');
const client = creds.getFreshClient();

const testCount = 10000;

async function setTest(n) {
    return new Promise((resolve, reject) => {
        console.log(`CALL setTest(${n})`);
        let collected = 0;
        for (let i = 1; i <= n; ++i) {
            client.set(i.toString(), `set${i}`, (err, result) => { if (err) { reject(err); } else { ++collected; if (collected == n) resolve(); } });
        }
    });
}

async function getTest(n) {
    return new Promise((resolve, reject) => {
        console.log(`CALL getTest(${n})`);
        let collected = 0;
        for (let i = 1; i <= n; ++i) {
            client.get(i.toString(), (err, result) => { if (err) { reject(err); } else { ++collected; if (collected == n) resolve(); } });
        }
    });
}

async function delTest(n) {
    return new Promise((resolve, reject) => {
        console.log(`CALL delTest(${n})`);
        let collected = 0;
        for (let i = 1; i <= n; ++i) {
            client.del(i.toString(), (err, result) => { if (err) { reject(err); } else { ++collected; if (collected == n) resolve(); } });
        }
    });
}

async function incrTest(n) {
    return new Promise((resolve, reject) => {
        console.log(`CALL incrTest(${n})`);

        client.set('incr', '0', (err, result) => {
            if (err) {
                reject(err);
            }
            let collected = 0;
            for (let i = 1; i <= n; ++i) {
                client.incr('incr', (err, result) => { if (err) { reject(err); } else { ++collected; if (collected == n) resolve(); } });
            }
        });
    });
}

async function decrTest(n) {
    return new Promise((resolve, reject) => {
        console.log(`CALL decrTest(${n})`);

        client.set('decr', '10000', (err, result) => {
            if (err) {
                reject(err);
            }
            let collected = 0;
            for (let i = 1; i <= n; ++i) {
                client.decr('decr', (err, result) => { if (err) { reject(err); } else { ++collected; if (collected == n) resolve(); } });
            }
        });
    });
}

async function hsetTest(n) {
    return new Promise((resolve, reject) => {
        console.log(`CALL hsetTest(${n})`);
        let collected = 0;
        for (let i = 1; i <= n; ++i) {
            client.hset('hash', i.toString(), JSON.stringify({id: i, val: `val-${i}`}), (err, result) => { if (err) { reject(err); } else { ++collected; if (collected == n) resolve(); } });
        }
    });
}

async function hgetTest(n) {
    return new Promise((resolve, reject) => {
        console.log(`CALL hgeTest(${n})`);
        let collected = 0;
        for (let i = 1; i <= n; ++i) {
            client.hget('hash', i.toString(), (err, result) => { if (err) { reject(err); } else { ++collected; if (collected == n) resolve(); } });
        }
    });
}

async function runTests() {
    let startTime = new Date();
    await setTest(testCount);
    console.log(`Complete in ${new Date() - startTime}ms`); startTime = new Date();
    await getTest(testCount);
    console.log(`Complete in ${new Date() - startTime}ms`); startTime = new Date();
    await delTest(testCount);
    console.log(`Complete in ${new Date() - startTime}ms`); startTime = new Date();
    await incrTest(testCount);
    console.log(`Complete in ${new Date() - startTime}ms`); startTime = new Date();
    await decrTest(testCount);
    console.log(`Complete in ${new Date() - startTime}ms`); startTime = new Date();
    await hsetTest(testCount);
    console.log(`Complete in ${new Date() - startTime}ms`); startTime = new Date();
    await hgetTest(testCount);
    console.log(`Complete in ${new Date() - startTime}ms`); startTime = new Date();
    client.quit();
}


console.log('Preparing');
client.on('ready', () => { console.log('REDIS: ready'); runTests(); });
client.on('error', (err) => { console.error(`REDIS: error: ${err.message}`) });
client.on('connect', () => { console.log('REDIS: connect') });
client.on('end', () => { console.log('REDIS: end') });