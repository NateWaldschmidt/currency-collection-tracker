import CoinGrade from "$lib/entities/coins/coin-grade.entity";
import ResponseHelper from "$lib/server/utilities/response-helper";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async function({ locals }) {
    const gradesRepo = locals.dataSource.getRepository(CoinGrade);
    
    return ResponseHelper.jsonResponse(
        { message: 'Successfully queried all coin strikes.', data: await gradesRepo.find() },
        200,
    );
}