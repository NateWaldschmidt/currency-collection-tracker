import UsMintRepository from "$lib/server/repository/us-mint-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async function({ locals }) {
    const usMintRepo = new UsMintRepository(locals.connection);
    const mints = await usMintRepo.findAll();

    return ResponseHelper.jsonResponse(
        'Successfully queried all U.S mints.',
        mints,
    );
}