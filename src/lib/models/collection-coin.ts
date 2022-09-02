import type Coin from './coin';
import type Grade from './grade';
import type GradingCompany from './grading-company';
import BaseModel from '$lib/models/base-model';
import Joi from 'joi';

/** The interface for creating a collection coin. */
export interface CollectionCoinJson {
    id?: number;
    user_id?: number;
    collection_id?: number | null;
    // TODO Add a link to collection.
    coin_id?: number;
    coin?: Coin;
    owned?: boolean;
    hunting?: boolean;
    grading_company_id?: number | null;
    grading_company?: GradingCompany | null;
    grade_id?: number | null;
    grade?: Grade | null;
    note?: string | null;
}

/** The model for a coin owned by a user. */
export default class CollectionCoin extends BaseModel<CollectionCoin> {
    public id: number;
    public user_id: number;
    public collection_id: number | null;
    public coin_id: number;
    public coin: Coin;
    public owned: boolean;
    public hunting: boolean;
    public grading_company_id: number | null;
    public grading_company: GradingCompany | null;
    public grade_id: number | null;
    public grade: Grade | null;
    public note: string | null;

    constructor(ccJson: CollectionCoinJson) {
        super();

        if (
            ccJson.id === undefined ||
            ccJson.user_id === undefined ||
            ccJson.coin_id === undefined ||
            ccJson.coin === undefined ||
            ccJson.owned === undefined ||
            ccJson.hunting === undefined
        ) {
            throw new ReferenceError(`Missing required field.`);
        }

        this.id = ccJson.id;
        this.user_id = ccJson.user_id;
        this.collection_id = ccJson.collection_id || null;
        this.coin_id = ccJson.coin_id;
        this.coin = ccJson.coin;
        this.owned = ccJson.owned;
        this.hunting = ccJson.hunting;
        this.grading_company_id = ccJson.grading_company_id || null;
        this.grading_company = ccJson.grading_company || null;
        this.grade_id = ccJson.grade_id || null;
        this.grade = ccJson.grade || null;
        this.note = ccJson.note || null;
    }

    /** @inheritdoc */
    public getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            id: Joi.number().integer().min(1).required(),
            user_id: Joi.number().integer().min(1).required(),
            collection_id: Joi.number().integer().min(1).allow(null),
            coin_id: Joi.number().integer().min(1).required(),
            coin: Joi.object().required(),
            owned: Joi.boolean().required(),
            hunting: Joi.boolean().required(),
            grading_company_id: Joi.number().integer().min(1).allow(null),
        });
    }
}