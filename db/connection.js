import { Pool } from 'pg';
import config from '../config';

const client = new Pool({
  connectionString: process.env.DB,
});

export default client;
