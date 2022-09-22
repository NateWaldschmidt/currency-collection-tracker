import createConnection from "$lib/database/connection";
import CoinGroupRepository from "$lib/repository/coin-group-repository";
import CoinRepository from "$lib/repository/coin-repository";
import ResponseHelper from "$lib/utilities/response-helper";
import BaseModel from "$lib/models/base-model";
import type { RequestHandler } from "@sveltejs/kit";

/** Handles the request for a group ID and it's corresponding coins. */
export const get: RequestHandler = async function({ params }) {
    // Ensure the group ID is an integer.
    if (!Number.isInteger(+params.groupId)) {
        return ResponseHelper.createErrorResponse(400, 'The coin group ID is an invalid form, must be an integer.');
    }

    /** The passed in coin group ID. */
    const coinGroupId = Number.parseInt(params.groupId);

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