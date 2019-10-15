const rpcWSC = require('rpc-websockets').Client;
const async = require('async');

let ws = new rpcWSC('ws://localhost:4000');
ws.on('open', () => {
    ws.login({ login: '123', password: '123' }).then(function () {
        ws.call('square', [3]).then(r => { console.log(`square(3) = ${r}`) });
        ws.call('square', [5, 4]).then(r => { console.log(`square(5, 4) = ${r}`) });
        ws.call('sum', [2]).then(r => { console.log(`sum(2) = ${r}`) });
        ws.call('sum', [2, 4, 6, 8, 10]).then(r => { console.log(`sum(2, 4, 6, 8, 10) = ${r}`) });
        ws.call('mul', [3]).then(r => { console.log(`mul(3) = ${r}`) });
        ws.call('mul', [3, 5, 7, 9, 11, 13]).then(r => { console.log(`mul(3, 5, 7, 9, 11, 13) = ${r}`) });
        ws.call('fib', [1]).then(r => { console.log(`fib(1) = ${r}`) }).catch(e => console.log(e.message));
        ws.call('fib', [2]).then(r => { console.log(`fib(2) = ${r}`) }).catch(e => console.log(e.message));
        ws.call('fib', [7]).then(r => { console.log(`fib(7) = ${r}`) }).catch(e => console.log(e.message));
        ws.call('fact', [0]).then(r => { console.log(`fact(0) = ${r}`) }).catch(e => console.log(e.message));
        ws.call('fact', [5]).then(r => { console.log(`fact(5) = ${r}`) }).catch(e => console.log(e.message));
        ws.call('fact', [10]).then(r => { console.log(`fact(10) = ${r}`) }).catch(e => console.log(e.message));

        async.parallel({
            square1: cb => { ws.call('square', [1]).then(r => cb(null, r)) },
            square2: cb => { ws.call('square', [5, 4]).then(r => cb(null, r)) },
            mul: cb => { ws.call('mul', [3, 5, 7, 9, 11, 13]).then(r => cb(null, r)) }
        },
            (e, r) => {
                async.parallel({
                    sum: cb => {
                        ws.call('sum', [r.square1, r.square2, r.mul]).then(r => cb(null, r))
                    },
                    fib: cb => {
                        ws.call('fib', [7]).then(r => cb(null, r)).catch(e => cb(e, null))
                    },
                    mul: cb => {
                        ws.call('mul', [2, 4, 6]).then(r => cb(null, r))
                    }
                },
                    (e, r) => {
                        if (!e) {
                            console.log(JSON.stringify(r));
                            let fibSum = 0;
                            r.fib.forEach((p) => {
                                fibSum += p;
                            });
                            console.log(r.sum + fibSum * r.mul);
                        } else {
                            console.log(e.message);
                        }
                    });
            });
    });
});