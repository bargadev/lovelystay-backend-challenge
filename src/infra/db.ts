import * as dotenv from 'dotenv';
import * as pgPromise from 'pg-promise';

dotenv.config({ path: '.env' });

const pgp = pgPromise();

let dbInstance = null;

export const conn = () => {
  if (!dbInstance) {
    dbInstance = pgp(process.env.DATABASE_URL);
  }
  return dbInstance;
};
