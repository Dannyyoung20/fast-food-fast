import drop from './drop';
import schema from './tables';
import client from '../connection';

// Structuring our SQL query
const migration = `
${drop}
${schema}
`;

client.connect((err, db, done) => {
  db.query(migration, () => {
    done();
    client.end();
  });
});
