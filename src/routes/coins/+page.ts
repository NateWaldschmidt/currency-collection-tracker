import type { PageLoad } from './$types';

/** The data to be loaded for each of the coin groups on the /coins route. */
export const load: PageLoad = async function({ fetch }) {
    return {
        coinGroups: (await (await fetch('/api/coins/groups')).json()).data
    };
}
