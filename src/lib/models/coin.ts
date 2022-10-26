import type CoinComposition       from "./coin-compositions";
import type CoinStrike            from "./coin-strike";
import type UsMint                from "./us-mint";
import type CoinVariety           from "./coin-variety";
import type CoinGroup             from "./coin-group";
import BaseModel                  from "$lib/models/base-model";
import Joi from "joi";

/** The JSON used to construct a coin. */
export interface CoinJson {
    id?: number,
    urlKey?: string,
    groupId?: number,
    year?: number,
    mintMarkId?: number | null,
    mintId?: number,
    additionalTitle?: string | null,
    strikeId?: number,
    compositionId?: number,
    mintage?: number | null,
    diameter?: number | null,
    varietyIds?: number[],
}

/** The model for Coins. */
export default class Coin extends BaseModel<Coin> {
    /** The ID of the coin within the database. */
    public id: number;
    /** The unique identifier for the coin in a url. */
    public urlKey: string;
    /** The ID of the group the coin belongs to. */
    public groupId: number;
    /** The year that appears on this coin. Generally the year the coin was minted. */
    public year: number;
    /** The ID of the mint that has marked this coin. */
    public mintMarkId: number | null;
    /** The ID of the mint that minted the coin. */
    public mintId: number;
    /** The additional description of the coin. */
    public additionalTitle: string | null;
    /** The ID of the strike. */
    public strikeId: number;
    /** The ID of the composition for the coin. */
    public compositionId: number;
    /** The number of coins that were minted. */
    public mintage: number | null;
    /** The diameter of the coin. */
    public diameter: number | null;
    /** The IDs of all varieties for this coin. */
    public varietyIds: number[];
    /** The array of strings for the coin's varieties. */

    public constructor(coinJson: CoinJson) {
        super();

        // Checks for required fields
        if (coinJson.id               === undefined
            || coinJson.urlKey        === undefined
            || coinJson.groupId       === undefined
            || coinJson.year          === undefined
            || coinJson.mintId        === undefined
            || coinJson.strikeId      === undefined
            || coinJson.compositionId === undefined) {
            throw new ReferenceError(`Missing required field.`);
        }

        // Sets all fields.
        this.id              = coinJson.id;
        this.urlKey          = coinJson.urlKey;
        this.groupId         = coinJson.groupId;
        this.year            = coinJson.year;
        this.mintMarkId      = coinJson.mintMarkId || null;
        this.mintId          = coinJson.mintId;
        this.additionalTitle = coinJson.additionalTitle || null;
        this.strikeId        = coinJson.strikeId;
        this.compositionId   = coinJson.compositionId;
        this.mintage         = coinJson.mintage || null;
        this.diameter        = coinJson.diameter || null;
        this.varietyIds      = coinJson.varietyIds || [];
    }

    /**
     * Builds out the full title for a coin as the year-mintmark additional title with the mintmark conditionally added.
     */
    public getFullTitle(): string {
        if (this.year) {
            let title = this.year?.toString();

            if (this.additionalTitle) title = `${title} ${this.additionalTitle}`;
    
            return title;
        }
        return '';
    }

    /** See the static {@link Coin.getMintageString() getMintageString()}. */
    public getMintageString(): string {
        return Coin.getMintageString(this.mintage);
    }

    /**
     * @returns a formatted string for the mintage.
     */
    public static getMintageString(mintage: number | null): string {
        return mintage?.toLocaleString('US') || '-';
    }

    /**
     * @returns the diameter as a string with a unit.
     */
    public getDiameterString(): string {
        return this.diameter ? `${this.diameter}mm` : '-';
    }

    /** @inheritdoc */
    public getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            id:            Joi.number().integer().min(1).required(),
            groupId:       Joi.number().integer().min(1).required(),
            year:          Joi.number().integer().min(1).required(),
            mintMarkId:    Joi.number().integer().min(1).allow(null),
            mintId:        Joi.number().integer().min(1).required(),
            mint:          Joi.object().required(),
            strikeId:      Joi.number().integer().min(1).required(),
            strike:        Joi.object().required(),
            compositionId: Joi.number().integer().min(1).required(),
            composition:   Joi.object().required(),
            mintage:       Joi.number().integer().min(1).allow(null),
            diameter:      Joi.number().min(0.01).allow(null),
            varietyIds:    Joi.array().items(Joi.number().integer().min(1)),
            varieties:     Joi.array().items(Joi.object()),
        });
    }
}