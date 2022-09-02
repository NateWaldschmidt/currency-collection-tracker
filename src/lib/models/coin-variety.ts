import BaseModel from "./base-model";
import Joi from "joi";

/** A JSON Object for building Coin Varieties. */
export interface CoinVarietyJson {
    id?: number,
    title?: string,
    description?: string | null;
}

/** The model for a Coin Variety. */
export default class CoinVariety extends BaseModel<CoinVariety> {
    public id: number;
    /** The title of this coin variety. */
    public title: string;
    /** A description of what this variety is. */
    public description?: string | null;

    constructor(coinVarietyJson: CoinVarietyJson) {
        super();

        // Checks for required fields
        if (coinVarietyJson['id'] === undefined
            || coinVarietyJson['title'] === undefined) {
            throw new ReferenceError(`Missing required field.`);
        }

        this.id = coinVarietyJson.id;
        this.title = coinVarietyJson.title;
        this.description = coinVarietyJson.description;
    }

    /**
     * @inheritDoc 
     */
    public getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            id:          Joi.number()
                            .integer()
                            .min(1)
                            .required(),
            title:       Joi.string()
                            .min(1)
                            .max(255)
                            .trim()
                            .required(),
            description: Joi.string()
                            .min(1)
                            .max(1000)
                            .trim()
                            .allow(null),
        });
    }
}