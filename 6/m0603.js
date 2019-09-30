exports.send = function(message) {
    let sendmail = require('sendmail')({silent: true});
    sendmail({
        from: 'bbddimonmobile@yandex.ru',
        to: 'bbddimonmobile@yandex.ru',
        subject: 'kek',
        html: message
    });
    return message;
}