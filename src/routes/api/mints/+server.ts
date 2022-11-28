import Mint from "$lib/entities/coins/mint.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async function({ locals }) {
    const mintRepo = locals.dataSource.getRepository(Mint);

    return ResponseHelper.jsonResponse(
        'Successfully queried all U.S mints.',
        await mintRepo.find(),
    );
}