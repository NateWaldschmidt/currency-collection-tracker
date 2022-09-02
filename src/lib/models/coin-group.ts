import BaseModel from "./base-model";

/** The Coin Groups. */
export default class CoinGroup extends BaseModel<CoinGroup> {
    id?: number;
    /** The title of this particular coin group. */
    title?: string;
    /** The denomination for the coin group. */
    denomination?: number;
}