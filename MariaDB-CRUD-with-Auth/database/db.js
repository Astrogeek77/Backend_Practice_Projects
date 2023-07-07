const mariadb = require("mariadb");

const config = require("../config");

module.exports.createDb = async () => {
  const conn = await mariadb.createConnection({
    host: config.maria_HOST,
    user: config.maria_USER,
    password: config.maria_PASSWORD,
    port: config.maria_PORT_DATABASE,
  });

  await conn.query("CREATE DATABASE IF NOT EXISTS news");

  await conn.query(
    "CREATE TABLE IF NOT EXISTS news.users ( \
    id INT(11) NOT NULL AUTO_INCREMENT, \
    username VARCHAR(55) NOT NULL, \
    email VARCHAR(55) NOT NULL, \
    password LONGTEXT NOT NULL, \
    profilePic VARCHAR(255),\
    PRIMARY KEY (id))"
  );

  await conn.query(
    "CREATE TABLE IF NOT EXISTS news.entries ( \
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, \
    title VARCHAR(255) NOT NULL, \
    content LONGTEXT NOT NULL, \
    date DATE DEFAULT CURRENT_DATE,\
    time TIME DEFAULT CURRENT_TIME, \
    userId INT NOT NULL, \
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)"
  );

  await conn.query(
    "CREATE TABLE IF NOT EXISTS news.images ( \
     id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,  \
     url VARCHAR(255) NOT NULL, \
     newsId INT NOT NULL, \
     FOREIGN KEY (newsId) REFERENCES entries(id) ON DELETE CASCADE)"
  );

  

  await conn.query(
    "CREATE TABLE IF NOT EXISTS news.comments ( \
      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, \
      text LONGTEXT NOT NULL, \
      newsId INT NOT NULL, \
      userId INT NOT NULL, \
      FOREIGN KEY (newsId) REFERENCES entries(id) ON DELETE CASCADE, \
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)"
  );
  return conn;
};

module.exports.connectDb = async () => {
  const conn = await mariadb.createConnection({
    host: config.maria_HOST,
    user: config.maria_USER,
    password: config.maria_PASSWORD,
    port: config.maria_PORT_DATABASE,
    database: config.maria_DATABASE,
  });
  return conn;
};
