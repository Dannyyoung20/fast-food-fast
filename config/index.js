import dotenv from 'dotenv';

dotenv.config();
const dbPassword = process.env.PGPASSWORD;
const config = {
  dbUri: `postgres://postgres:${dbPassword}@localhost:5432/fast_food`,
  dbOptions: {
    user: 'postgres',
    database: 'fast_food',
    password: 'P@55menow',
    host: 'localhost',
    port: 5432,
    max: 10,
  },
};

export default config;
