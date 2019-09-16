var util = require('util');
var ee = require('events');

var db_data = [{}];
function DB() {
    this.get = () => {return db_data};
    this.post = (r) => {db_data.push(r);};
}

util.inherits(DB, ee.EventEmitter);

exports.DB = DB;