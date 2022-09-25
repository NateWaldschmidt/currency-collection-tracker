import BaseModel from "./base-model";
import Joi from 'joi';
import mediaConfig from '$lib/media-config';

/** The structure for creating a CoinGroup model. */
export interface CoinGroupJson {
    id?: number,
    urlKey?: string,
    title?: string,
    obverseImage?: string,
    reverseImage?: string,
    denomination?: number,
}

/** The Coin Groups. */
export default class CoinGroup extends BaseModel<CoinGroup> {
    id: number;
    /** The unique identifier to be used in URLs. */
    urlKey: string | null;
    /** The title of this particular coin group. */
    title: string;
    /** The filename for an image of the obverse for this coin. */
    obverseImage: string | null;
    /** The filename for an image of the reverse for this coin. */
    reverseImage: string | null;
    /** The denomination for the coin group. */
    denomination: number | null;

    public constructor(groupJson: CoinGroupJson) {
        super();

        if (!groupJson.id
            || !groupJson.title) {
            throw new ReferenceError(`Missing required field.`);
        }

        this.id = groupJson.id;
        this.urlKey = groupJson.urlKey || null;
        this.title = groupJson.title;
        this.obverseImage = groupJson.obverseImage || null;
        this.reverseImage = groupJson.reverseImage || null;
        this.denomination = groupJson.denomination || null;
    }
    
    /** @returns The path for this coin group's obverse image. */
    public getObverseImagePath(): string|undefined {
        if (!this.obverseImage) return this.getDefaultImagePath();
        return `${mediaConfig.coinGroupImagePath}/${this.obverseImage}`
    }

    /** @returns The path for this coin group's reverse image. */
    public getReverseImagePath(): string|undefined {
        if (!this.reverseImage) return this.getDefaultImagePath();
        return `${mediaConfig.coinGroupImagePath}/${this.reverseImage}`
    }

    /** @returns The default coin group image's path. */
    public getDefaultImagePath(): string {
        return `${mediaConfig.coinGroupImagePath}/default.svg`;
    }

    /** @inheritdoc */
    public getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            id: Joi.number().integer().min(1).required(),
            urlKey: Joi.string().pattern(/^[a-zA-Z][a-zA-Z0-9\-]*$/).allow(null),
            title: Joi.string().required(),
            obverseImage: Joi.string().allow(null),
            reverseImage: Joi.string().allow(null),
            denomination: Joi.number().min(0).allow(null),
        });
    }
}