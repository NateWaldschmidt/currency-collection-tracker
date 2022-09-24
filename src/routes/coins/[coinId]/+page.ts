import Coin from "$lib/models/coin";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async function ({ params, fetch }) {
    const response = await fetch(`/api/coins/${params.coinId}`);

    if (response.status === 404) throw error(404, response.statusText);
    if (response.status === 400) throw error(400, response.statusText);
    if (response.status !== 200) throw error(500, response.statusText);

    const responseJson = await response.json();

    return {
        coin: new Coin(responseJson.data),
    }
}
