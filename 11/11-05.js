const rpcWSS = require('rpc-websockets').Server;

let server = new rpcWSS({port: 4000, host: 'localhost'});

server.register('square', params => {
    if (params.length == 1) {
        return Math.pow(params[0], 2) * Math.PI;
    } else {
        return params[0] * params[1];
    }
}).public();

server.register('sum', params => {
    let sum = 0;
    params.forEach(element => {
        sum += element;
    });
    return sum;
}).public();

server.register('mul', params => {
    let mul = 1;
    params.forEach(element => {
        mul *= element;
    });
    return mul;
}).public();

server.register('fib', params => {
    let n = params[0];
    let arr = [];
    arr.push(1);
    if (n > 1)
        arr.push(1);
    for(let i = 2 ; i < n; ++i) {
        arr.push(arr[i-1] + arr[i-2]);
    }
    return arr;
}).protected();

server.register('fact', params => {
    let n = params[0];
    let result = 1;
    for(let i = 1; i <= n; ++i)
        result *= i;
    return result;
}).protected();