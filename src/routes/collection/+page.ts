import Coin from '$lib/entities/coins/coin.entity';
import UserCoin from '$lib/entities/coins/user-coin.entity';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, parent }) => {
    const parentData = await parent();

    // Check if the user is authenticated.
    if (!parentData.user) {
        throw redirect(302, '/sign-in');
    }

    const coinsResponse = await fetch(`/api/users/${parentData.user.id}/coins`);
    const coins = await coinsResponse.json();
    const userCoins = coins.data.map((coin: any) => {
        const userCoin = Object.assign(new UserCoin(), coin) as UserCoin;
        userCoin.coin = Object.assign(new Coin(), userCoin.coin);

        return userCoin;
    }) as UserCoin[];

    return {
        coins: userCoins,
    }
};