//Database Queries
let db = require('./db');

exports.getUser = async (email) => {
    try {
        let result = await db.query(
            'SELECT * FROM users WHERE email = ?', email
        );
        return result;
    } catch (err) {
        return err;
    }
    
}

exports.createUser = async (name, password, email) => {
    try {
        let result = await db.query(
            'INSERT INTO users(name, password, email) VALUES(?, ?, ?)', [name, password, email]
        );
        return result;
    } catch(err) {
        return err;
    }
}