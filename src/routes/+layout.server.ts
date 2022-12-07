import User from "$lib/entities/user.entity";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async function ({ locals }) {
    // Loads the user.
    if (locals.user) {
        const userRepo = locals.dataSource.getRepository(User);
        const user = await userRepo.findOneBy({ id: locals.user.id });

        return {
            // Converts to JSON object instead of class object.
            user: JSON.parse(JSON.stringify(user)),
        }
    }
}