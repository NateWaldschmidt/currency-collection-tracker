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

        return this.recordsToObject(rows);
    }

    /**
     * Converts database records into Coin Group objects.
     * 
     * @param record 
     */
    public recordToObject(record: { [key: string]: string; }): CoinGroup | undefined {
        if (!record) return;

        return new CoinGroup({
            id: Number.parseInt(record.id),
            title: record.title,
            denomination: Number.parseFloat(record.denomination),
            obverseImage: record.obverse_image_filename,
            reverseImage: record.reverse_image_filename
        });
    }
}
