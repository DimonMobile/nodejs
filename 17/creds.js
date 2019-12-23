const redis = require('redis');

exports.getFreshClient = function() {
    return redis.createClient('//redis-17284.c9.us-east-1-4.ec2.cloud.redislabs.com:17284', { password: 'e5esvJqNRSOf5hwkfChFLeEnXICh1dwQ' });
}