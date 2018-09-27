import { Pool } from 'pg';
import config from '../config';

const pool = new Pool(config.dbOptions);

function selectAll(table, cb) {
  const query = `SELECT * FROM ${table}`;

  pool.connect((err, db, done) => {
    db.query(query, (error, response) => {
      done();
      pool.end();
      cb(error, response);
    });
  });
}

function selectById(table, id, cb) {
  const query = `SELECT * FROM ${table} WHERE id=$1`;

  pool.connect((err, db, done) => {
    db.query(query, [id], (error, response) => {
      done();
      pool.end();
      cb(error, response);
    });
  });
}

function selectByEmailPassword(table, credentials, cb) {
  const query = `SELECT * FROM ${table} WHERE email=$1 AND password=$2`;

  pool.connect((err, db, done) => {
    db.query(query, credentials, (error, response) => {
      done();
      pool.end();
      cb(error, response);
    });
  });
}

function updateById(query, id, cb) {
  pool.connect((err, db, done) => {
    db.query(query, [id], (error, response) => {
      done();
      pool.end();
      cb(error, response);
    });
  });
}

function insert(query, credentials, cb) {
  pool.connect((err, db, done) => {
    db.query(query, credentials, (error, response) => {
      done();
      pool.end();
      cb(error, response);
    });
  });
}

const DB = {
  selectAll,
  selectById,
  selectByEmailPassword,
  updateById,
  insert,
};

export default DB;
