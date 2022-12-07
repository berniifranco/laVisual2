require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "287678_lavisual",
    "password": "1560013735",
    "database": "lavisual2",
    "host": "mysql-berniifranco.alwaysdata.net",
    "dialect": "mysql"
  },
  "production": {
    "username": "287678_lavisual",
    "password": "1560013735",
    "database": "lavisual2",
    "host": "mysql-berniifranco.alwaysdata.net",
    "dialect": "mysql"
  }
}
