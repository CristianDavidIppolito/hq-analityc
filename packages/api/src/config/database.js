const mysql = require('mysql');

/**
 * Class to handle the database operations
 *
 * @class Database
 */
class Database {
  /**
   * Creates an instance of Database.
   * @memberof Database
   */
  constructor() {
    require('dotenv').config({path: '../../.env'});
    this.connection = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB,
    });
  }

  /**
   * Connect to the DB
   *
   * @return {Promise}
   */
  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  /**
   * Fucntion to execute SQL sentences
   *
   * @param {String} sql
   * @param {Array} args
   * @return {Promise}
   */
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  /**
   * Disconnect to DB
   *
   * @return {Promise}
   */
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  /**
   * Function to destroy the connection
   *
   * @memberof Database
   */
  destroy() {
    this.connection.destroy();
  }
}

module.exports = Database;
