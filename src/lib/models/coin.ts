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
    groupId?: number,
    group?: CoinGroup,
    year?: number,
    mintMarkId?: number | null,
    mintId?: number,
    mint?: UsMint,
    additionalTitle?: string | null,
    strikeId?: number,
    strike?: CoinStrike,
    compositionId?: number,
    composition?: CoinComposition,
    mintage?: number | null,
    diameter?: number | null,
    varietyIds?: number[],
    varieties?: CoinVariety[],
}

/** The model for Coins. */
export default class Coin extends BaseModel<Coin> {
    /** The ID of the coin within the database. */
    public id: number;
    /** The ID of the group the coin belongs to. */
    public groupId: number;
    /** The year that appears on this coin. Generally the year the coin was minted. */
    public year: number;
    /** The ID of the mint that has marked this coin. */
    public mintMarkId: number | null;
    /** The ID of the mint that minted the coin. */
    public mintId: number;
    /** The Mint that produced the coin. */
    public mint: UsMint;
    /** The additional description of the coin. */
    public additionalTitle: string | null;
    /** The ID of the strike. */
    public strikeId: number;
    /** The type of strike for this coin. */
    public strike: CoinStrike;
    /** The ID of the composition for the coin. */
    public compositionId: number;
    /** The composition of the coin. */
    public composition: CoinComposition;
    /** The number of coins that were minted. */
    public mintage: number | null;
    /** The diameter of the coin. */
    public diameter: number | null;
    /** The IDs of all varieties for this coin. */
    public varietyIds: number[];
    /** The array of strings for the coin's varieties. */
    public varieties: CoinVariety[];

    public constructor(coinJson: CoinJson) {
        super();

        // Checks for required fields
        if (coinJson.id               === undefined
            || coinJson.groupId       === undefined
            || coinJson.year          === undefined
            || coinJson.mintId        === undefined
            || coinJson.mint          === undefined
            || coinJson.strikeId      === undefined
            || coinJson.strike        === undefined
            || coinJson.compositionId === undefined
            || coinJson.composition   === undefined) {
            throw new ReferenceError(`Missing required field.`);
        }

        // Sets all fields.
        this.id              = coinJson.id;
        this.groupId         = coinJson.groupId;
        this.year            = coinJson.year;
        this.mintMarkId      = coinJson.mintMarkId || null;
        this.mintId          = coinJson.mintId;
        this.mint            = coinJson.mint;
        this.additionalTitle = coinJson.additionalTitle || null;
        this.strikeId        = coinJson.strikeId;
        this.strike          = coinJson.strike;
        this.compositionId   = coinJson.compositionId;
        this.composition     = coinJson.composition;
        this.mintage         = coinJson.mintage || null;
        this.diameter        = coinJson.diameter || null;
        this.varietyIds      = coinJson.varietyIds || [];
        this.varieties       = coinJson.varieties || [];
    }

    /**
     * Builds out the full title for a coin as the year-mintmark additional title with the mintmark conditionally added.
     */
    public getFullTitle(): string {
        if (this.year) {
            let title = this.year?.toString();

            if (this.mintMarkId) title = `${title}-${this.mint?.mark}`;
            if (this.additionalTitle) title = `${title} ${this.additionalTitle}`;
            if (this.varieties) title = `${title} ${this.varieties.map((variety) => variety.title).join(' ')}`;
    
            return title;
        }
        return '';
    }

    /**
     * @returns a formatted string with a unit of the weight.
     */
    public getWeightString(): string {
        return `${this.composition?.weight}g` || '-';
    }

    /**
     * {@link Coin.getMintageString() getMintageString()}
     */
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