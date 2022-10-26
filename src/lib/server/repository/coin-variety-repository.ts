import CoinVariety from "$lib/models/coin-variety";
import Repository from "$lib/server/repository/repository";
import type mysql2 from 'mysql2';

export default class CoinVarietyRepository extends Repository<CoinVariety> {
    /** The coin's table name. */
    public static readonly TABLE_NAME = 'cct_coin_varieties';
    /** The join table for coin varieties. */
    public static readonly JOIN_TABLE_NAME = 'cct_coin_variety_relationships';

    /**
     * @inheritDoc
     */
    public async findById(id: number): Promise<CoinVariety|void> {
        return;
    }

    /**
     * @inheritDoc
     */
    public recordToObject(record: { [key: string]: string; }): CoinVariety {
        return new CoinVariety(
            Number.parseInt(record.id),
            record.title,
            record.description || null,
        );
    }
}