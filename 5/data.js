var util = require('util');
var ee = require('events');

var db_data = [{'id': 1, 'fio': 'Kek Shrek', 'date': '05-07-1002'}];
function DB() {
    this.statStarted = Date();
    this.statCompleted = Date();
    this.getCount = 0;
    this.insertCount = 0;
    this.deleteCount = 0;
    this.commitCount = 0;
    this.updateCount = 0;

    this.reset = () => {
        statStarted = Date();
        getCount = 0;
        insertCount = 0;
        deleteCount = 0;
        commitCount = 0;
        updateCount = 0;
    }

    this.getResult = () => {
        statCompleted = Date();
        let result = {
            'started': statStarted,
            'completed': statCompleted,
            'getCount': getCount,
            'insertCount': insertCount,
            'deleteCount': deleteCount,
            'updateCount': updateCount
        };
        return result;
    }

    this.getStat = () => {
        return `Get: ${getCount}, Insert: ${insertCount}, Delete: ${deleteCount}, Commit: ${commitCount}, Update: ${updateCount}`;
    }

    this.select = () => {++getCount; return db_data;};
    this.insert = (r) => {
        r['id'] = db_data.length + 1;
        db_data.push(r);
        ++insertCount;
    };
    this.update = (r) => {
        let found = db_data.find(p => p.id == r.id);
        if (found != undefined) {
            found.fio = r.fio;
            found.date = r.date;
        }
        ++updateCount;
    };
    this.delete = (index) => {
        db_data = db_data.filter(p => p.id != index);
        ++deleteCount;
    };
    this.commit = () => {
        console.log("Commited");
        ++this.commitCount;
    }
}

util.inherits(DB, ee.EventEmitter);

exports.DB = DB;