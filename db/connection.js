import { Pool } from 'pg';

const client = new Pool({
  connectionString: process.env.DB,
});

export default client;
