module.exports = {
    "up": "CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, username varchar(52) NOT NULL, password varchar(52), name varchar(52), PRIMARY KEY (id))",
    "down": "DROP TABLE users"
}