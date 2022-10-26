import type mysql from 'mysql2';
import Coin from '$lib/models/coin';
import Repository from '$lib/server/repository/repository';

/** The repository for managing coins. */
export default class CoinRepository extends Repository<Coin> {
    /** The coin's table name. */
    public static readonly TABLE_NAME = 'cct_coins';

    /**
     * Finds a particular coin using the ID.
     * 
     * @param id The ID of the coin being searched for.
     */
    public async findById(id: number): Promise<Coin|void> {
        /** All the coins found with this ID. */
        const [rows] = (<mysql.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${CoinRepository.TABLE_NAME} WHERE coin.id = ?;`,
            [id]
        ));
        /** The coin record found when querying the database. */
        const coinRecord = rows[0];

        // Did not find the coin record in the database.
        if (!coinRecord) return;

        return this.recordToObject(coinRecord);
    }

    /**
     * Queries for a particular coin with it's URL key and group ID.
     * 
     * @param urlKey 
     * @returns 
     */
    public async findByUrlKey(urlKey: string, groupId: number) : Promise<Coin|void> {
        /** All the coins found with this ID. */
        const [rows] = (<mysql.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${CoinRepository.TABLE_NAME} WHERE url_key = ? AND group_id = ?;`,
            [urlKey, groupId]
        ));
        /** The coin record found when querying the database. */
        const coinRecord = rows[0];

        // Did not find the coin record in the database.
        if (!coinRecord) return;

        return this.recordToObject(coinRecord);
    }

    /**
     * Finds all the coins that are apart of the group with the passed in ID.
     * 
     * @param groupId The ID of the group to find coins for.
     */
    public async findByGroupId(groupId: number): Promise<Coin[]> {
        const [rows] = (<mysql.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${CoinRepository.TABLE_NAME} WHERE group_id = ? ORDER BY year;`,
            [groupId]
        ));

        return this.recordsToObject(rows);
    }

    /**
     * Handles the creation of a single coin.
     * 
     * @param coin The coin to be created within the database.
     */
    public async create(coin: Coin): Promise<void> {
        await this.createRange([coin]);
    }

    /**
     * Handles the creation of multiple coins.
     * 
     * @param coins All of the coin records to be created.
     */
    public async createRange(coins: Coin[]): Promise<void> {
        /** The query to run to create a new coin record. */
        let query = `
            INSERT INTO ${CoinRepository.TABLE_NAME} (
                group_id,
                year,
                mint_mark_id,
                additional_title,
                strike_id,
                mint_id,
                mintage,
                diameter,
                composition_id
            ) VALUES
        `;

        /** All of the placeholder values to be filled into the query. */
        const placeholders: any[] = [];

        // Loops all of the users to add the record.
        coins.forEach((coin, index) => {
            /** If this iteration should be displayed with a comma. */
            const comma = index !== 0 ? ',' : '';
            // Adds the placeholders for the query.
            query = `${query}${comma} (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            // Appends the values to the placeholders array.
            placeholders.push(
                coin.groupId ?? null,
                coin.year ?? null,
                coin.mintMarkId ?? null,
                coin.additionalTitle ?? null,
                coin.strikeId ?? null,
                coin.mintId ?? null,
                coin.mintage ?? null,
                coin.diameter ? coin.diameter * 100 : null,
                coin.compositionId ?? null,
            );
        });

        // Inserts all of the coins into the Coins table.
        await this.conn.query(query, placeholders);
    }

    /**
     * Handles updating a coin record.
     * 
     * @param coin The coin's record to update.
     */
    public async update(coin: Coin): Promise<void> {
        await this.conn.query(`
            UPDATE ${CoinRepository.TABLE_NAME}
                SET coin.year             = ?,
                SET coin.additional_title = ?,
                SET coin.mintage          = ?,
                SET coin.diameter         = ?
            WHERE id = ?;
        `, [
            coin.year ?? null,
            coin.additionalTitle ?? null,
            coin.mintage ?? null,
            coin.diameter ? coin.diameter * 100 : null,
        ]);
    }

    /**
     * Handles deleting a coin.
     * 
     * @param id The ID of the coin to delete.
     */
    public async delete(id: number): Promise<void> {
        /** The queries to run to delete the coin. */
        const queries = `DELETE FROM ${CoinRepository.TABLE_NAME} WHERE id = ?`;
        await this.conn.query(queries, [id]);
    }

    /**
     * @inheritDoc
     */
    public recordToObject(coinRecord: mysql.RowDataPacket): Coin {
        /** The coin that is to be created. */
        return new Coin({
            id:              Number.parseInt(coinRecord.id),
            urlKey:          coinRecord.url_key,
            groupId:         Number.parseInt(coinRecord.group_id),
            year:            Number.parseInt(coinRecord.year),
            mintMarkId:      Number.parseInt(coinRecord.mint_mark_id),
            mintId:          Number.parseInt(coinRecord.mint_id),
            additionalTitle: coinRecord.additional_title,
            strikeId:        Number.parseInt(coinRecord.strike_id),
            mintage:         coinRecord.mintage ? Number.parseInt(coinRecord.mintage) : null,
            diameter:        coinRecord.diameter ? Number.parseInt(coinRecord.diameter) / 100 : null,
            compositionId:   Number.parseInt(coinRecord.composition_id),
        });
    }
}