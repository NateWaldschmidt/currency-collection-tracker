import type mysql2 from 'mysql2';
import CoinGroup from "$lib/models/coin-group";
import Repository from "$lib/repository/repository";

export default class CoinGroupRepository extends Repository<CoinGroup> {
    /** The table name for the U.S. mint database table. */
    private static readonly COIN_GROUP_TABLE_NAME = 'cct_coin_groups';

    /**
     * Finds a particular Coin Group by ID.
     * 
     * @param id 
     */
    public async findById(id: number): Promise<void|CoinGroup> {
        /** The rows with the passed in ID. */
        const [rows] = (<mysql2.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${CoinGroupRepository.COIN_GROUP_TABLE_NAME} WHERE id = ?;`,
            [id],
        ));

        /** The Coin Group found with the ID passed in. */
        const group = rows[0];

        if (!group) return;

        return this.recordToObject(group);
    }

    /**
     * Finds all the coin groups within the database.
     */
    public async findAll(): Promise<CoinGroup[]> {
        /** All of the rows found. */
        const [rows] = (<mysql2.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${CoinGroupRepository.COIN_GROUP_TABLE_NAME};`,
        ));

        /** The mints to be returned. */
        const groups: CoinGroup[] = [];

        // Loops the different rows found with the query.
        for (const index in rows) {
            groups.push(this.recordToObject(rows[index]));
        }

        return groups;
    }

    /**
     * Converts database records into Coin Group objects.
     * 
     * @param record 
     */
    public recordToObject(record: { [key: string]: string; }): CoinGroup {
        /** The coin group object to be returned. */
        const coinGroup = new CoinGroup();

        // Sets the coin group objects.
        coinGroup.id           = Number.parseInt(record.id);
        coinGroup.title        = record.title;
        coinGroup.denomination =  Number.parseInt(record.denomination) / 1000;

        return coinGroup;
    }
}
