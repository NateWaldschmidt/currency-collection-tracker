import { DataSource } from "typeorm";
import 'dotenv/config';

import Composition from "$lib/entities/composition.entity";
import Material from "$lib/entities/composition.entity";
import User from "$lib/entities/user.entity";

import CoinGrade from "$lib/entities/coins/coin-grade.entity";
import CoinGroup from "$lib/entities/coins/coin-group.entity";
import CoinStrike from "$lib/entities/coins/coin-strike.entity";
import CoinVariety from "$lib/entities/coins/coin-variety.entity";
import Coin from "$lib/entities/coins/coin.entity";
import GradingCompany from "$lib/entities/coins/grading-company.entity";
import Mint from "$lib/entities/coins/mint.entity";

export const AppDataSource = new DataSource({
    type:         "mysql",
    host:         process.env['DATABASE_HOST'],
    port:         3306,
    username:     process.env['DATABASE_USER'],
    password:     process.env['DATABASE_USER_PASSWORD'],
    database:     process.env['DATABASE_NAME'],
    synchronize:  true,
    logging:      false,
    // TODO Get the auto loading of these to work.
    entities:     [
        Composition,
        Material,
        User,
        CoinGrade,
        CoinGroup,
        CoinStrike,
        CoinVariety,
        Coin,
        GradingCompany,
        Mint,
    ],
    entityPrefix: 'ct_',
    subscribers:  [],
});

AppDataSource.initialize();