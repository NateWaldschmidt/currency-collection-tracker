import CoinStrike from "$lib/models/coin-strike";
import Repository from "$lib/server/repository/repository";

export default class CoinStrikeRepository extends Repository<CoinStrike> {
    /** The database table name for coin strikes. */
    public static readonly TABLE_NAME = 'cct_coin_strikes';

    /**
     * Converts the coin strike records to coin strike objects.
     * 
     * @param strikeRecord The database returned strike.
     * @returns 
     */
     public recordToObject(strikeRecord: { [key: string]: string }): CoinStrike {
        return new CoinStrike({
            id :          Number.parseInt(strikeRecord.id),
            title:        strikeRecord.title,
            abbreviation: strikeRecord.abbreviation,
        });
    }
}