import type mysql2 from 'mysql2';
import CoinStrike from "$lib/models/coin-strike";
import Repository from "$lib/server/repository/repository";

export default class CoinStrikeRepository extends Repository<CoinStrike> {
    /** The database table name for coin strikes. */
    public static readonly COIN_STRIKE_TABLE_NAME = 'cct_coin_strikes';

    /**
     * Finds a particular strike record using the passed in ID.
     * 
     * @param id The ID of the strike to find.
     */
    public async findById(id: number): Promise<void|CoinStrike> {
        /** The rows with the passed in ID. */
        const [rows] = (<mysql2.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${CoinStrikeRepository.COIN_STRIKE_TABLE_NAME} WHERE id = ?;`,
            [id],
        ));
        /** The single mint that was found. */
        const mint = rows[0];

        if (!mint) return;

        return this.recordToObject(mint);
    }

    /**
     * Finds all of the coin strikes that exist within the database.
     */
    public async findAll(): Promise<CoinStrike[]|[]> {
        /** All of the U.S. Mints within the database. */
        const [rows] = (<mysql2.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${CoinStrikeRepository.COIN_STRIKE_TABLE_NAME};`,
        ));

        /** The mints to be returned. */
        const strikes: CoinStrike[] = [];

        // Loops the different rows found with the query.
        for (const index in rows) {
            strikes.push(this.recordToObject(rows[index]));
        }

        return strikes;
    }

    /**
     * Converts the coin strike records to coin strike objects.
     * 
     * @param strikeRecord The database returned strike.
     * @returns 
     */
     public recordToObject(strikeRecord: { [key: string]: string; }): CoinStrike {
        /** The coin strike object being constructed. */
        const strike = new CoinStrike();

        // Sets all of the mint's fields.
        strike.id           = Number.parseInt(strikeRecord.id);
        strike.title        = strikeRecord.title;
        strike.abbreviation = strikeRecord.abbreviation;

        return strike;
    }
}