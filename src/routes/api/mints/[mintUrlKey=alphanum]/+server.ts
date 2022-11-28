import Mint from "$lib/entities/coins/mint.entity";
import UsMintRepository from "$lib/server/repository/us-mint-repository";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

/** Finds Mint's using their URL Key. */
export const GET: RequestHandler = async function({ locals, params }) {
    const mintRepo = locals.dataSource.getRepository(Mint);

    return ResponseHelper.jsonResponse(
        `Successfully queried for the U.S. Mint.`,
        await mintRepo.findOne({ where: { urlKey: params.mintUrlKey } }),
    );
}