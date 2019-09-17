var util = require('util');
var ee = require('events');

var db_data = [{'id': 1, 'fio': 'Kek Shrek', 'date': '05-07-1002'}];
function DB() {
    this.get = () => {return db_data};
    this.post = (r) => {db_data.push(r);};
}

util.inherits(DB, ee.EventEmitter);

exports.DB = DB;