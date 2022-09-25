import Coin, { type CoinJson } from '$lib/models/coin';
import CoinGroup from '$lib/models/coin-group';
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types';

export const load: PageLoad = async function({ params, fetch }) {
    /** The URL key to be found. */
    const groupUrlKey = params.groupUrlKey;

    const groupResponse = await fetch(`/api/coins/groups/${groupUrlKey}`);
    if (groupResponse.status === 404) throw error(404, groupResponse.statusText);
    if (groupResponse.status === 400) throw error(400, groupResponse.statusText);
    if (groupResponse.status !== 200) throw error(500, groupResponse.statusText);
    const groupResponseJson = await groupResponse.json();
    const coinGroup: CoinGroup = new CoinGroup(groupResponseJson.data);

    const coinsResponse = await fetch(`/api/coins/groups/${groupUrlKey}/coins`);
    if (coinsResponse.status === 404) throw error(404, coinsResponse.statusText);
    if (coinsResponse.status === 400) throw error(400, coinsResponse.statusText);
    if (coinsResponse.status !== 200) throw error(500, coinsResponse.statusText);
    const coinsResponseJson = await coinsResponse.json();
    const coins: Coin[] = coinsResponseJson.data.map((coinJson: CoinJson) => new Coin(coinJson)); 

    return {
        coinGroup: coinGroup,
        coins: coins,
    };
}
