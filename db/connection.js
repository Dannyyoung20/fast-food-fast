import { Pool } from 'pg';
import config from '../config';

const client = new Pool({
  connectionString: config.dbUri,
});

export default client;
