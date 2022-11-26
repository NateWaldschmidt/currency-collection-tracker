import Joi from 'joi';
import MediaConfig from '$lib/media-config';
import Entity from "$lib/models/entity";

/** The structure for creating a CoinGroup model. */
export interface CoinGroupData {
    id: number,
    urlKey: string | null,
    title: string,
    obverseImage: string | null,
    reverseImage: string | null,
    denomination: number | null,
}

interface CoinGroup extends CoinGroupData {}

/** The Coin Groups. */
class CoinGroup extends Entity<CoinGroup, CoinGroupData> {

    /** @returns The path for this coin group's obverse image. */
    public getObverseImagePath(): string|undefined {
        if (!this.obverseImage) return this.getDefaultImagePath();
        return `${MediaConfig.coinGroupImagePath}/${this.obverseImage}`
    }

    /** @returns The path for this coin group's reverse image. */
    public getReverseImagePath(): string|undefined {
        if (!this.reverseImage) return this.getDefaultImagePath();
        return `${MediaConfig.coinGroupImagePath}/${this.reverseImage}`
    }

    /** @returns The default coin group image's path. */
    public getDefaultImagePath(): string {
        return `${MediaConfig.coinGroupImagePath}/default.svg`;
    }

    /** @inheritDoc */
    public getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            id:           Joi.number()
                             .integer()
                             .min(1)
                             .required(),
            urlKey:       Joi.string()
                             .pattern(/^[a-z][a-z0-9\-][a-z0-9]*$/)
                             .allow(null),
            title:        Joi.string(),
            obverseImage: Joi.string()
                             .allow(null),
            reverseImage: Joi.string()
                             .allow(null),
            denomination: Joi.number()
                             .min(0)
                             .allow(null),
        });
    }
}

export default CoinGroup;