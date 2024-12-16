import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_DB_HOST || 'db',
    port: Number(process.env.MYSQL_DB_PORT) || 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true, // Set to false in production
    logging: false,
    entities: [__dirname + '/../entities/*.ts'], // Path to entities
    migrations: [__dirname + '/../migrations/*.ts'],
    extra: {
        connectionLimit: 5,
        connectTimeout: 10000,
        charset: 'utf8mb4_unicode_ci',
        timezone: 'Z',
        insecureAuth: true
    }
});
