import CoinGroupRepository from "$lib/server/repository/coin-group-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async function({ locals, params }) {
    const coinGroupRepo = new CoinGroupRepository(locals.connection);
    const group         = await coinGroupRepo.findByUrlKey(params.groupUrlKey);

    return ResponseHelper.jsonResponse(
        'Successfully queried the coin group.',
        group,
    );
}