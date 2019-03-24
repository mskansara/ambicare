module.exports = {
    "up": "CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, name varchar(52) NOT NULL, password varchar(52), email varchar(52), PRIMARY KEY (id))",
    "down": "DROP TABLE users"
}