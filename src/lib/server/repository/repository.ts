import type mysql from 'mysql2/promise';

export default abstract class Repository<EntityType> {
    /** The connection for the database. */
    protected conn: mysql.Connection;
    /** The name of the table being interacted with in this repository. */
    public static readonly TABLE_NAME: string;

    constructor (conn: mysql.Connection) {
        this.conn = conn;
    }

    create?(entity: EntityType): Promise<void>;
    createRange?(entities: EntityType[]): Promise<void>;
    update?(entity: EntityType): Promise<void>;
    delete?(id: number): Promise<void>;
    
    /**
     * Queries for a record using the passed in ID.
     * 
     * @param id The ID being queried for.
     * 
     * @returns An entity found or nothing if it does not exist.
     */
    async findById(id: number): Promise<EntityType|void> {
        const [rows] = <mysql.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${(<any>this.constructor).TABLE_NAME} WHERE id = ? LIMIT 1;`,
            [id]
        );
        return this.recordToObject(rows[0]);
    }

    /**
     * Queries for all records in the table.
     * 
     * @returns All the entities found in the table.
     */
    async findAll(): Promise<EntityType[]> {
        /** All of the U.S. Mints within the database. */
        const [rows] = <mysql.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${(<any>this.constructor).TABLE_NAME};`,
        );

        /** The mints to be returned. */
        const entities: EntityType[] = [];

        // Loops the different rows found with the query.
        for (const index in rows) {
            /** The entity to be made. */
            const entity = this.recordToObject(rows[index]);

            // Ensure an entity was made.
            if (entity) {
                entities.push(entity);
            }
        }

        return entities;
    }

    /**
     * Handles converting multiple records to coin objects.
     * 
     * @param records The rows found with the query.
     * @returns An array of coin objects.
     */
    public recordsToObject(records: mysql.RowDataPacket|any[]): EntityType[] {
        // Handles records.
        if (!records) return [];

        /** The model objects to be returned. */
        const models = [];

        // Loops the different rows found with the query.
        for (const key in records) {
            const model = this.recordToObject(records[key]);
            if (model) models.push(model);
        }

        return models;
    }

    /**
     * Converts a database record into a model object.
     * 
     * @param record The record from the database.
     */
    public abstract recordToObject(record: mysql.RowDataPacket): EntityType | undefined;

    /**
     * Converts MySQL dates into Javascript dates.
     * 
     * @param dateField 
     * @returns 
     */
    public static databaseDateToDate(dateField: string): Date {
        /** Splits the date up by the dash. */
        const dateParts = String(dateField).split('-');

        return new Date(
            parseInt(dateParts[0]),
            parseInt(dateParts[1]) - 1,
            parseInt(String(dateParts[2]).substr(0,2))
        );
    }
}