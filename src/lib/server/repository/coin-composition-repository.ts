import type mysql2 from 'mysql2';
import Repository from "$lib/server/repository/repository";
import CoinComposition from '$lib/models/coin-compositions';

export default class CoinCompositionRepository extends Repository<CoinComposition> {
    /** The table name for coin compositions. */
    public static readonly COIN_COMPOSITION_TABLE_NAME = 'cct_coin_compositions';

    /**
     * Finds a particular coin composition by the ID of the composition.
     * 
     * @param id 
     */
    public async findById(id: number): Promise<void|CoinComposition> {
        /** The rows with the passed in ID. */
        const [rows] = (<mysql2.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${CoinCompositionRepository.COIN_COMPOSITION_TABLE_NAME} WHERE id = ?;`,
            [id],
        ));

        const composition = rows[0];

        if (!composition) return;

        return this.recordToObject(composition);
    }

    /**
     * Finds all of the coin composition records that exist within the database.
     */
    public async findAll():Promise<CoinComposition[]> {
        /** All of the rows found with the query. */
        const [rows] = (<mysql2.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${CoinCompositionRepository.COIN_COMPOSITION_TABLE_NAME};`
        ))

        /** The mints to be returned. */
        const compositions: CoinComposition[] = [];

        // Loops the different rows found with the query.
        for (const index in rows) {
            compositions.push(this.recordToObject(rows[index]));
        }

        return compositions;
    }

    /**
     * Converts the database records to objects.
     * 
     * @param record 
     * @returns 
     */
    public recordToObject(record: { [key: string]: string; }): CoinComposition {
        /** The composition to be returned. */
        const coinComposition = new CoinComposition();

        // Sets the composition.
        coinComposition.id = Number.parseInt(record.id);
        coinComposition.title = record.title;
        coinComposition.weight = Number.parseInt(record.weight) / 100;
        coinComposition.description = record.description;
        coinComposition.composition = [];

        return coinComposition;
    }
}