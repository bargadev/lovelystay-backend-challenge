import * as dotenv from 'dotenv';
import * as pgPromise from 'pg-promise';

dotenv.config({ path: '.env' });

const pgp = pgPromise();
export const db = pgp(process.env.DATABASE_URL);
