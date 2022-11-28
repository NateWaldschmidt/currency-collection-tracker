import CoinGroup from "$lib/entities/coins/coin-group.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async function({ locals, params }) {
    const coinGroupRepo = locals.dataSource.getRepository(CoinGroup);
    const group         = await coinGroupRepo.findOneBy({ urlKey: params.groupUrlKey });

    // Could not find the coin group.
    if (!group) {
        return new Response(null, {
            'status': 404,
            'statusText': `Could not find a coin group with the URL key ${params.groupUrlKey}.`,
        });
    }

    return ResponseHelper.jsonResponse(
        'Successfully queried the coin group.',
        group,
    );
}