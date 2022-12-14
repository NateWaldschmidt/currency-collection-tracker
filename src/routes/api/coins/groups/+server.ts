import CoinGroup from "$lib/entities/coins/coin-group.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async function({ locals }) {
    const coinGroupRepo = locals.dataSource.getRepository(CoinGroup);

    return ResponseHelper.jsonResponse({
        message: 'Successfully queried all coin groups.',
        data: await coinGroupRepo.find(),
    }, 200);
}