import User from "$lib/entities/user.entity";
import UserCoin from "$lib/entities/coins/user-coin.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Load up a particular user coin. */
export const GET: RequestHandler<{userId: string, userCoinId: string}, 'userCoin'> = async function({ locals, params }) {
    const userRepo = locals.dataSource.getRepository(User);
    const user = await userRepo.findOne({
        relations: {
            coins: {
                coin: true,
            },
        },
        where: { id: Number.parseInt(params.userId) },
    });
    if (!user) {
        return ResponseHelper.jsonResponse(
            { message: `Unable to find a user with the ID of '${params.userId}'.` },
            404,
        );
    }

    const userCoin = user.coins.find((coin) => coin.id.toString() == params.userCoinId);
    if (!userCoin) {
        return ResponseHelper.jsonResponse(
            { message: `Unable to find a user coin with the ID of '${params.userId}'.` },
            404,
        );
    }

    return ResponseHelper.jsonResponse(
        { message: 'Successfully found user coin.', data: userCoin },
        200,
    );
}

export const DELETE: RequestHandler<{userId: string, userCoinId: string}, 'userCoinDelete'> = async function({ locals, params }) {
    const userRepo = locals.dataSource.getRepository(User);
    const user = await userRepo.findOne({
        relations: {
            coins: {
                coin: true,
            },
        },
        where: { id: Number.parseInt(params.userId) },
    });
    if (!user) {
        return ResponseHelper.jsonResponse(
            { message: `Unable to find a user with the ID of '${params.userId}'.` },
            404,
        );
    }

    const userCoin = user.coins.find((coin) => coin.id.toString() == params.userCoinId);
    if (!userCoin) {
        return ResponseHelper.jsonResponse(
            { message: `Unable to find a user coin with the ID of '${params.userId}'.` },
            404,
        );
    }

    const userCoinRepo = locals.dataSource.getRepository(UserCoin);
    await userCoinRepo.softDelete(params.userCoinId);

    return ResponseHelper.jsonResponse(
        { message: 'Successfully deleted the coin.' },
        200,
    );
}