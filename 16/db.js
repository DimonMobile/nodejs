const db = require('oracledb');

const dbconf = {
    user: 'system',
    password: 'oracle',
    connectString: 'localhost/pda_pdb.be.by'
}

let connection;
console.log('Connecting to database...');
db.getConnection(dbconf).then(result => {
    connection = result;
    console.log('Database connected');
}).catch(err => {
    console.error(`DB connection error ${err.message}`);
})

exports.DB = {
    getFaculties: async function () {
        console.log('getFaculties');
        let resultSet = await connection.execute('SELECT * FROM FACULTY');
        let result = [];
        for (let row of resultSet.rows) {
            result.push({
                faculty: row[0],
                facultyName: row[1]
            });
        }
        return result;
    },

    getFaculty: async function(faculty) {
        let resultSet = await connection.execute(`SELECT * FROM FACULTY WHERE FACULTY like '%${faculty}%'`);
        if (resultSet.rows.length === 0)
            return null;
        else
            return {
                faculty: resultSet.rows[0][0],
                facultyName: resultSet.rows[0][1]
            }
    },

    addFaculty: async function(faculty) {
        await connection.execute(`INSERT INTO FACULTY (FACULTY, FACULTY_NAME) VALUES ('${faculty.faculty}', '${faculty.facultyName}')`);
        return faculty;
    },

    updateFaculty: async function(faculty) {
        await connection.execute(`UPDATE FACULTY SET FACULTY_NAME = '${faculty.facultyName}' WHERE FACULTY like '%${faculty.faculty}%'`);
        return faculty;
    },

    delFaculty: async function(faculty) {
        await connection.execute(`DELETE FROM FACULTY WHERE FACULTY like '%${faculty.faculty}%'`);
        return faculty;
    },

    commit: async function() {
        await connection.execute('commit');
    }
}