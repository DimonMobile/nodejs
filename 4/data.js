var util = require('util');
var ee = require('events');

var db_data = [{'id': 1, 'fio': 'Kek Shrek', 'date': '05-07-1002'}];
function DB() {
    this.select = () => {return db_data};
    this.insert = (r) => {
        r['id'] = db_data.length + 1;
        db_data.push(r);
    };
}

util.inherits(DB, ee.EventEmitter);

exports.DB = DB;