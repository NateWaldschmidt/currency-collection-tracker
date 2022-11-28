import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types';

export const load: PageLoad = async function({ params, fetch }) {
    /** The URL key to be found. */
    const groupUrlKey = params.groupUrlKey;

    const groupResponse = await fetch(`/api/coins/${groupUrlKey}`);
    if (groupResponse.status === 404) throw error(404, groupResponse.statusText);
    if (groupResponse.status === 400) throw error(400, groupResponse.statusText);
    if (groupResponse.status !== 200) throw error(500, groupResponse.statusText);
    const coinGroup = (await groupResponse.json()).data;

    const coinsResponse = await fetch(`/api/coins/${groupUrlKey}/coins`);
    if (coinsResponse.status === 404) throw error(404, coinsResponse.statusText);
    if (coinsResponse.status === 400) throw error(400, coinsResponse.statusText);
    if (coinsResponse.status !== 200) throw error(500, coinsResponse.statusText);
    const coins = (await coinsResponse.json()).data; 

    return {
        coinGroup: coinGroup,
        coins: coins,
    };
}
