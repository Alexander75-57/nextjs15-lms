import { defineConfig } from 'drizzle-kit';

import { env } from '@/data/env/server';

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/drizzle/schema.ts',
    out: './src/drizzle/migrations',
    strict: true,
    verbose: true,
    dbCredentials: {
        password: env.DB_PASSWORD,
        user: env.DB_USER,
        database: env.DB_NAME,
        host: env.DB_HOST,
        ssl: false, // as local DataBase
        /* url: `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`, */
    },
});
