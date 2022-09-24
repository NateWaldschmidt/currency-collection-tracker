import Coin, { type CoinJson } from '$lib/models/coin';
import CoinGroup from '$lib/models/coin-group';
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types';

/** Queries for a particular coin group and its corresponding coins. */
export const load: PageLoad = async function({ params, fetch }) {
    /** The response from the request. */
    const response = await fetch(`/api/coins/groups/${params.groupId}`);

    // Check for bad statuses.
    if (response.status === 404) throw error(404, response.statusText);
    if (response.status === 400) throw error(400, response.statusText);
    if (response.status !== 200) throw error(500, response.statusText);

    /** The JSON pulled from the response. */
    const responseJson = await response.json();

    /** The coin group found and to be returned. */
    const coinGroup: CoinGroup = new CoinGroup(responseJson.data.coinGroup);
    /** All the coins in this group found. */
    const coins: Coin[] = responseJson.data.coins.map((coinJson: CoinJson) => new Coin(coinJson)); 
    
    return {
        coinGroup: coinGroup,
        coins: coins,
    };
}
