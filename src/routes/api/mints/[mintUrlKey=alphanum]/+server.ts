import createConnection from "$lib/server/database/connection";
import UsMintRepository from "$lib/server/repository/us-mint-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Finds Mint's using their URL Key. */
export const GET: RequestHandler = async function({ locals, params }) {
    const usMintRepo = new UsMintRepository(locals.connection);
    const mint = await usMintRepo.findByUrlKey(params.mintUrlKey);

    // Did not find a grading company with that ID.
    if (!mint) {
        return new Response(null, {
            status: 404,
            statusText: `Could not find a U.S. Mint with the URL key of ${params.mintUrlKey}.`,
        })
    }

    return ResponseHelper.jsonResponse(
        `Successfully queried for the U.S. Mint.`,
        mint,
    );
}