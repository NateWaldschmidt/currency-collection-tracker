import type mysql2 from 'mysql2';
import CoinGroup from "$lib/models/coin-group";
import Repository from "$lib/server/repository/repository";

export default class CoinGroupRepository extends Repository<CoinGroup> {
    /** The table name for the U.S. mint database table. */
    static readonly TABLE_NAME = 'cct_coin_groups';

    /**
     * Finds a particular Coin Group using their unique URL key.
     * 
     * @param urlKey 
     * @returns 
     */
    public async findByUrlKey(urlKey: string): Promise<CoinGroup|undefined> {
        /** The rows with the passed in URL key. */
        const [rows] = (<mysql2.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${CoinGroupRepository.TABLE_NAME} WHERE url_key = ?;`,
            [urlKey],
        ));
        return this.recordToObject(rows[0]);
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
            urlKey: record.url_key,
            title: record.title,
            denomination: Number.parseFloat(record.denomination),
            obverseImage: record.obverse_image_filename,
            reverseImage: record.reverse_image_filename
        });
    }
}
