import mysql from 'mysql2/promise';
import 'dotenv/config';

/**
 * A single location to connect to the database.
 * 
 * @returns The database connection.
 */
export default async function createConnection(): Promise<mysql.Connection> {
    return await mysql.createConnection({
        host: 'cct-db',
        database: process.env['DATABASE_NAME'],
        user: process.env['DATABASE_USER'],
        password: process.env['DATABASE_USER_PASSWORD'],
    });
}