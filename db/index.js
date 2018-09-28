import { Pool } from 'pg';
import config from '../config';

const pool = new Pool(config.dbOptions);

// Fn used to get all items in angiven table
// @params table TABLE_NAME, cb Callback fn
const selectAll = (table, cb) => {
  const query = `SELECT * FROM ${table}`;

  pool.connect((err, db, done) => {
    db.query(query, (error, response) => {
      done();
      pool.end();
      cb(error, response);
    });
  });
};

// Fn used to select a particular item in the db based on id
// @params table TABLE_NAME, id OBEJECT_ID, cb Callback fn
const selectById = (table, id, cb) => {
  const query = `SELECT * FROM ${table} WHERE id=$1`;

  pool.connect((err, db, done) => {
    db.query(query, [id], (error, response) => {
      done();
      pool.end();
      cb(error, response);
    });
  });
};

// Fn used to get user via email and password
// @params table TABLE_NAME, credentials [email, password], cb Callback fn
const selectByEmailPassword = (table, credentials, cb) => {
  const query = `SELECT * FROM ${table} WHERE email=$1 AND password=$2`;

  pool.connect((err, db, done) => {
    db.query(query, credentials, (error, response) => {
      done();
      pool.end();
      cb(error, response);
    });
  });
};

// Fn used to update a particaular record based on the id
// @params query SQL_QUERY, id OBEJECT_ID, cb Callback fn
const updateById = (query, id, cb) => {
  pool.connect((err, db, done) => {
    db.query(query, [id], (error, response) => {
      done();
      pool.end();
      cb(error, response);
    });
  });
};

// Fn used to insert a record into a given table
// @params query SQL_QUERY, credentials [], cb Callback fn
const insert = (query, credentials, cb) => {
  pool.connect((err, db, done) => {
    db.query(query, credentials, (error, response) => {
      done();
      pool.end();
      cb(error, response);
    });
  });
};

const DB = {
  selectAll,
  selectById,
  selectByEmailPassword,
  updateById,
  insert,
};

export default DB;
