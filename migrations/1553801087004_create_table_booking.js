module.exports = {
    "up": "CREATE TABLE booking (id INT NOT NULL AUTO_INCREMENT, userid INT, driverid INT, pickup_location varchar(255), drop_location varchar(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (userid) REFERENCES users(id), FOREIGN KEY (driverid) REFERENCES drivers(id))",
    "down": "DROP TABLE booking"
}