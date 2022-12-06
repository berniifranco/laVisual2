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
    "username": "bdee7200668d83",
    "password": "10b39978",
    "database": "heroku_e41372576585311",
    "host": "us-cdbr-east-06.cleardb.net",
    "dialect": "mysql"
  },
  "production": {
    "username": "bdee7200668d83",
    "password": "10b39978",
    "database": "heroku_e41372576585311",
    "host": "us-cdbr-east-06.cleardb.net",
    "dialect": "mysql"
  }
}
