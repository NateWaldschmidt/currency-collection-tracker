import createConnection from "$lib/database/connection";
import CoinGroupRepository from "$lib/repository/coin-group-repository";
import CoinRepository from "$lib/repository/coin-repository";
import ResponseHelper from "$lib/utilities/response-helper";
import BaseModel from "$lib/models/base-model";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
    /** The passed in coin group ID. */
    const coinGroupId = params.groupId;

    const conn = await createConnection();

    // Queries for the group with the passed in ID.
    const coinGroupRepo = new CoinGroupRepository(conn);
    const group = await coinGroupRepo.findById(coinGroupId);

    if (!group) return ResponseHelper.createErrorResponse(
        404,
        `Could not find a coin group with ID ${coinGroupId}.`
    );

    // Queries for the groups coins.
    const coinRepo = new CoinRepository(conn);
    const coins = await coinRepo.findByGroupId(coinGroupId);

    await conn.end();

    return ResponseHelper.createSuccessResponse(
        200,
        `Successfully queried for the coin group with ID ${coinGroupId}.`,
        {
            coinGroup: group.toJson(),
            coins: BaseModel.toJsonArray(coins),
        },
    );
}