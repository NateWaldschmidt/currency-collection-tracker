import type { PageLoad } from './$types';
import CoinGroup, { type CoinGroupJson } from '$lib/models/coin-group';

/** The data to be loaded for each of the coin groups on the /coins route. */
export const load: PageLoad = async function({ fetch }) {
    /** Response from the coin groups endpoint. */
    const response = await fetch('/api/coins/groups');
    /** The JSON from the response. */
    const responseJson = await response.json();
    /** The coin groups from the response. */
    const coinGroups: CoinGroup[] = responseJson.data.map((group: CoinGroupJson) => new CoinGroup(group))
    
    return { coinGroups: coinGroups };
}
