/** The metallic compositions. */
interface metallicComposition {
    /** The ID of the metal. */
    id?: number,
    /** The metal's name. */
    title?: string,
    /** The percentage of this composition. */
    percentage?: number,
}

/** The compositions for coins. */
export default class CoinComposition {
    id?: number;
    /** The title of this coin composition. */
    title?: string;
    /** The weight of the total composition. */
    weight?: number;
    /** A description of what this composition is. */
    description?: string;
    /** The different metals that make up the composition. */
    composition?: metallicComposition[];
}