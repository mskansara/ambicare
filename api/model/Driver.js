//Database Queries
let db = require('./db');
const user_model = require('../model/User');

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
exports.booking = async (userid, driverid, location, dropLocation) => {
    try {
        let result = await db.query (
            'INSERT INTO booking(userid, driverid, pickup_location, drop_location) VALUES(?, ?, ?, ?)', [userid, driverid, location, dropLocation]
        );
        return result;
    } catch(err) {
        return err;
    }
}