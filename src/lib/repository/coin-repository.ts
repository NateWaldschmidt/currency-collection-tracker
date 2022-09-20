import type mysql from 'mysql2';
import Coin, { type CoinJson } from "$lib/models/coin";
import Repository from "$lib/repository/repository";
import CoinStrikeRepository from './coin-strike-repository';
import UsMintRepository from './us-mint-repository';
import CoinCompositionRepository from './coin-composition-repository';
import CoinVarietyRepository from './coin-variety-repository';
import CoinVariety, { type CoinVarietyJson } from '$lib/models/coin-variety';

/** The repository for managing coins. */
export default class CoinRepository extends Repository<Coin> {
    /** The coin's table name. */
    public static readonly TABLE_NAME = 'cct_coins';
    /** The base query for a coin's information. */
    private baseQuery = `SELECT
        coin.*,
        strike.title AS strike_title,
        strike.abbreviation AS strike_abbreviation,
        mint.mark AS mint_mark,
        mint.city AS mint_city,
        mint.state AS mint_state,
        mint.date_opened AS mint_date_opened,
        mint.date_closed AS mint_date_closed,
        composition.title AS composition_title,
        composition.weight AS composition_weight,
        composition.description AS composition_description,
        GROUP_CONCAT(variety.id) AS variety_ids,
        GROUP_CONCAT(variety.title) AS variety_titles,
        GROUP_CONCAT(IF(variety.description IS NOT NULL, variety.description, 'null')) AS variety_descriptions
    FROM ${CoinRepository.TABLE_NAME} AS coin
    LEFT JOIN ${CoinStrikeRepository.COIN_STRIKE_TABLE_NAME} AS strike
        ON coin.strike_id = strike.id
    LEFT JOIN ${UsMintRepository.US_MINT_TABLE_NAME} AS mint
        ON coin.mint_id = mint.id
    LEFT JOIN ${CoinCompositionRepository.COIN_COMPOSITION_TABLE_NAME} AS composition
        ON coin.composition_id = composition.id
    LEFT JOIN ${CoinVarietyRepository.JOIN_TABLE_NAME} AS join_variety
        ON coin.id = join_variety.coin_id
    LEFT JOIN ${CoinVarietyRepository.TABLE_NAME} AS variety
        ON join_variety.variety_id = variety.id`;

    /**
     * Finds a particular coin using the ID.
     * 
     * @param id The ID of the coin being searched for.
     */
    public async findById(id: number): Promise<Coin|void> {
        /** All the coins found with this ID. */
        const [rows] = (<mysql.RowDataPacket[]> await this.conn.query(
            `${this.baseQuery} WHERE coin.id = ? GROUP BY coin.id LIMIT 1;`,
            [id]
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
            `${this.baseQuery} WHERE group_id = ? GROUP BY coin.id ORDER BY coin.year;`,
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
        /** The strike record taken out of the coin record. */
        const strikeRecord = {
            id:           coinRecord.strike_id,
            title:        coinRecord.strike_title,
            abbreviation: coinRecord.strike_abbreviation,
        };
        /** The mint record from the coin record. */
        const mintRecord = {
            id:          coinRecord.mint_id,
            mark:        coinRecord.mint_mark,
            city:        coinRecord.mint_city,
            state:       coinRecord.mint_state,
            date_opened: coinRecord.mint_date_opened,
            date_closed: coinRecord.mint_date_closed,
        };
        /** The coin composition record. */
        const compositionRecord = {
            id:          coinRecord.composition_id,
            title:       coinRecord.composition_title,
            weight:      coinRecord.composition_weight,
            description: coinRecord.composition_description,
        };
        const varieties: CoinVarietyJson[] = [];
        // Builds the coin record varities if there are variety IDs.
        if (coinRecord.variety_ids) {
            const variety_ids = coinRecord.variety_ids.split(',');
            const variety_titles = coinRecord.variety_titles.split(',');
            const variety_descriptions = coinRecord.variety_descriptions.split(',');

            // Parses out the comma separated values.
            variety_ids.forEach((val: any, index: number) => {
                varieties.push({
                    id: variety_ids[index],
                    title: variety_titles[index],
                    description: variety_descriptions[index] !== 'null' ? variety_descriptions[index] : null,
                });
            })
        }

        /** The coin that is to be created. */
        return new Coin({
            id:              Number.parseInt(coinRecord.id),
            groupId:         Number.parseInt(coinRecord.group_id),
            year:            Number.parseInt(coinRecord.year),
            mintMarkId:      Number.parseInt(coinRecord.mint_mark_id),
            mintId:          Number.parseInt(coinRecord.mint_id),
            mint:            new UsMintRepository(this.conn).recordToObject(mintRecord), // TODO Change
            additionalTitle: coinRecord.additional_title,
            strikeId:        Number.parseInt(coinRecord.strike_id),
            strike:          new CoinStrikeRepository(this.conn).recordToObject(strikeRecord), // TODO Change
            mintage:         coinRecord.mintage ? Number.parseInt(coinRecord.mintage) : null,
            diameter:        coinRecord.diameter ? Number.parseInt(coinRecord.diameter) / 100 : null,
            compositionId:   Number.parseInt(coinRecord.composition_id),
            composition:     new CoinCompositionRepository(this.conn).recordToObject(compositionRecord), // TODO Change
            varieties:       varieties.map((varietyJson: CoinVarietyJson) => new CoinVariety(varietyJson))
        });
    }
}