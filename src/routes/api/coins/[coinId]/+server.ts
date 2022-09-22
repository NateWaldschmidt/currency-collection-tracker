import createConnection from "$lib/database/connection";
import Coin from "$lib/models/coin";
import CoinRepository from "$lib/repository/coin-repository";
import RequestHelper from "$lib/utilities/request-helper";
import ResponseHelper from "$lib/utilities/response-helper";
import type { RequestEvent } from "@sveltejs/kit/types/internal";

/** @type {import('./__types/items').RequestHandler} */
export async function post(event: RequestEvent) {
    /** The FormData sent with the request. */
    const requestBody = RequestHelper.serializeFormData(await event.request.formData());

    /** This is the coin that is going to be created in the database. */
    const coin           = new Coin();
    coin.groupId         = Number.parseInt(requestBody['group-id']);
    coin.strikeId        = Number.parseInt(requestBody['strike-id']);
    coin.year            = Number.parseInt(requestBody['year']);
    coin.mintId          = Number.parseInt(requestBody['mint-id']);
    coin.mintMarkId      = requestBody['mint-marked'] ? coin.mintId : null;
    coin.additionalTitle = requestBody['additional-title'].trim() || null;
    coin.compositionId   = Number.parseInt(requestBody['composition-id']);
    coin.diameter        = Number.parseFloat(requestBody['diameter']) || null;
    coin.mintage         = Number.parseInt(requestBody['mintage']) || null;

    try {
        // Validates the coin.
        coin.validate();

    } catch (error) {
        return ResponseHelper.createErrorResponse(400, error.message);
    }

    try {
        const conn         = await createConnection();
        const coinRepo     = new CoinRepository(conn);
        // Creates the coin in the database.
        await coinRepo.create(coin);
        await conn.end();

        return ResponseHelper.createSuccessResponse(201, 'The coin was successfully created.');

    } catch (exception) {
        return ResponseHelper.createErrorResponse(500, 'There was an error saving the new coin.');
    }
}

/** @type {import('./__types/items').RequestHandler} */
export async function get(event: RequestEvent) {
    /** The passed in coin group ID. */
    const coinId = event.params.coinId;

    const conn = await createConnection();
    const coinRepo = new CoinRepository(conn);
    const coin = await coinRepo.findById(Number.parseInt(coinId));
    await conn.end();

    // Could not find the coin.
    if (!coin) return ResponseHelper.createErrorResponse(
        404,
        `Could not find the coin with the ID of ${coinId}.`
    );

    return ResponseHelper.createSuccessResponse(
        200,
        `Successfully queried coin with the ID of ${coinId}.`,
        JSON.parse(JSON.stringify(coin)),
    );
}