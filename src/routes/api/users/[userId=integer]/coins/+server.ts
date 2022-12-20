import Coin from "$lib/entities/coins/coin.entity";
import UserCoin from "$lib/entities/coins/user-coin.entity";
import User from "$lib/entities/user.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Finds all of a users coins. */
export const GET: RequestHandler<{userId: string}, 'userCoins'> = async function({ locals, params }) {
    const userRepo = locals.dataSource.getRepository(User);
    const user = await userRepo.findOne({
        relations: {
            coins: {
                coin: true,
            },
        },
        where: { id: Number.parseInt(params.userId) },
    });

    // User doesn't exist.
    if (user === null) {
        return ResponseHelper.jsonResponse(
            { message: `Unable to find a user with the ID of '${params.userId}'.` },
            404,
        );
    }

    return ResponseHelper.jsonResponse(
        { message: `Successfully queried all the user's coins.`, data: user.coins },
        200,
    );
}

/** Add a coin to the user's collection. */
export const POST: RequestHandler = async function({ locals, params }) {
    const user = await locals.dataSource.getRepository(User).findOneBy({ id: Number.parseInt(params.userId || '0') });
    if (user === null) {
        return ResponseHelper.jsonResponse(
            { message: `Unable to find a user with the ID of '${params.userId}'.` },
            404,
        );
    }

    const coin = await locals.dataSource.getRepository(Coin).findOneBy({ id: 1 });
    if (coin === null) {
        return ResponseHelper.jsonResponse(
            { message: `Unable to find a coin with the ID of '${1}'.` },
            404,
        );
    }

    const userCoinRepo = locals.dataSource.getRepository(UserCoin);
    const userCoin = new UserCoin();
    userCoin.coin = coin;
    userCoin.hunting = true;
    userCoin.owned = false;
    userCoin.user = user;
    userCoinRepo.insert(userCoin);

    return ResponseHelper.jsonResponse(
        { message: `Successfully added a new coin to the collection.` },
        201,
    );
}