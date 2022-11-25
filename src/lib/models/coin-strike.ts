import Entity from "$lib/models/entity";
import type { ObjectSchema } from "joi";
import Joi from "joi";

export interface CoinStrikeData {
    id: number,
    /** The title of the strike. */
    title: string,
    /** An abbreviation of the strike title. */
    abbreviation?: string,
}

interface CoinStrike extends CoinStrikeData { }

class CoinStrike extends Entity<CoinStrike, CoinStrikeData> {

    /** @inheritDoc */
    public getSchema(): ObjectSchema<CoinStrike> {
        return Joi.object({
            id:           Joi.number()
                             .integer()
                             .min(1)
                             .required(),
            title:        Joi.string()
                             .min(1)
                             .max(255),
            abbreviation: Joi.string()
                             .min(1)
                             .max(255)
                             .allow(null),
        });
    }
}

export default CoinStrike;