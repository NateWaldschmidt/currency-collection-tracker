import User from "$lib/entities/user.entity";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    const data: { user?: User } = {
        user: undefined,
    };

    // Loads the user.
    if (locals.user) {
        const userRepo = locals.dataSource.getRepository(User);
        const user = await userRepo.findOneBy({ id: locals.user.id });
        data.user = JSON.parse(JSON.stringify(user));
    }
    
    return data;
}