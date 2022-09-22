import type { PageLoad } from './$types';
import CoinGroup, { type CoinGroupJson } from '$lib/models/coin-group';

export const load: PageLoad = async function({ fetch }) {
    const coinGroupsResponse = await fetch('/api/coins/groups');
    const coinGroups = await coinGroupsResponse.json();

    return {
        coinGroups: coinGroups.data.map((group: CoinGroupJson) => new CoinGroup(group))
    };
}
