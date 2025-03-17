import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  migrations: ['migrations/*{.ts,.js}'],
};

export const connectionSource = new DataSource(config as DataSourceOptions);
