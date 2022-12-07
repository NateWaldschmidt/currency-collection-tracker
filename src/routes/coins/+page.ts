import CoinGroup from '$lib/entities/coins/coin-group.entity';
import type { PageLoad } from './$types';

export const load: PageLoad = async function({ fetch }) {
    const coinGroupResponse = await fetch('/api/coins/groups');
    const coinGroups = await coinGroupResponse.json();

    return {
        // TODO Try to type the API Response body.
        coinGroups: coinGroups.data.map((coinGroup: any) => Object.assign(CoinGroup, coinGroup)),
    }
}
