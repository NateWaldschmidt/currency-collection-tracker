import type mysql2 from 'mysql2';
import Repository from "$lib/repository/repository";
import UsMint from '$lib/models/us-mint';

export default class UsMintRepository extends Repository<UsMint> {
    /** The table name for the U.S. mint database table. */
    public static readonly US_MINT_TABLE_NAME = 'cct_us_mints';
    
    /**
     * Finds a mint based on the mint's ID within the database.
     * 
     * @param id The ID of the mint to find.
     */
    public async findById(id: number): Promise<any> {
        /** The rows with the passed in ID. */
        const [rows] = (<mysql2.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${UsMintRepository.US_MINT_TABLE_NAME} WHERE id = ?;`,
            [id],
        ));
        /** The single mint that was found. */
        const mint = rows[0];

        if (!mint) return;

        return this.recordToObject(mint);
    }

    /**
     * Finds all of the U.S. mints within the database.
     */
    public async findAll(): Promise<UsMint[]|[]> {
        /** All of the U.S. Mints within the database. */
        const [rows] = (<mysql2.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${UsMintRepository.US_MINT_TABLE_NAME} ORDER BY date_opened;`,
        ));

        /** The mints to be returned. */
        const mints: UsMint[] = [];

        // Loops the different rows found with the query.
        for (const index in rows) {
            mints.push(this.recordToObject(rows[index]));
        }

        return mints;
    }

    /**
     * Converts the mint records to objects.
     * 
     * @param mintRecord 
     * @returns 
     */
    public recordToObject(mintRecord: { [key: string]: string; }): UsMint {
        /** The mint object being constructed. */
        const mint = new UsMint();

        // Sets all of the mint's fields.
        mint.id         = Number.parseInt(mintRecord.id);
        mint.mark       = mintRecord.mark;
        mint.city       = mintRecord.city;
        mint.state      = mintRecord.state;
        mint.dateOpened = Repository.databaseDateToDate(mintRecord.date_opened);
        mint.dateClosed = Repository.databaseDateToDate(mintRecord.date_closed);

        return mint;
    }
}