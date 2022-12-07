import Mint from "$lib/entities/coins/mint.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Finds Mint's using their URL Key. */
export const GET: RequestHandler = async function({ locals, params }) {
    const mintRepo = locals.dataSource.getRepository(Mint);
    const mint = mintRepo.findOneBy({ urlKey: params.mintUrlKey });

    if (!mint) {
        return ResponseHelper.jsonResponse(
            { message: `Unable to find a mint with the URL key '${params.mintUrlKey}'.` },
            404,
        );
    }

    return ResponseHelper.jsonResponse(
        { message: `Successfully queried for the U.S. Mint.`, data: mint},
        200,
    );
}