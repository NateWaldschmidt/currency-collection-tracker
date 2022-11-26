import CoinGroupRepository from "$lib/server/repository/coin-group-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async function({ locals }) {
    const coinGroupRepo = new CoinGroupRepository(locals.connection);
    const groups = await coinGroupRepo.findAll();

    return new Response(ResponseHelper.stringifySuccessResponse(
        'Successfully queried all coin group.',
        groups,
    ));
}