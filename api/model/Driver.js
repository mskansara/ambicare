//Database Queries
let db = require('./db');

exports.getDriver = async (email) => {
    try {
        let result = await db.query(
            'SELECT * FROM drivers WHERE email = ?', email
        );
        return result;
    } catch(err) {
        return err;
    }
}

exports.createDriver = async (name, password, email) => {
    try {
        let result = await db.query (
            'INSERT INTO drivers(name, password, email) VALUES(?, ?, ?)', [name, password, email]
        );
        return result;
    } catch(err) {
        return err;
    }
}