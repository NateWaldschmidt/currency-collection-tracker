import CoinStrike, { type CoinStrikeData } from '$lib/models/coin-strike';
import Joi from 'joi';

/* TITLES */
test.each([
    ['t'],
    ['test'],
    [new Array(256).join('a')], // 255 Character string.
])(
    '%p is a valid coin variety title',
    async (title: CoinStrikeData["title"]) => {
        const coinStrikeData: CoinStrikeData = {
            id: 1,
            title: title,
        }

        expect(await (new CoinStrike(coinStrikeData)).validate()).toBe(true);
    }
);

test.each([
    [''],
    [new Array(257).join('a')], // 256 Character string.
])(
    '%p is an invalid coin variety title',
    async (title: CoinStrikeData["title"]) => {
        const coinStrike = new CoinStrike({
            id: 1,
            title: title,
        });

        await expect(async () => {
            await coinStrike.validate()
        }).rejects.toThrow(Joi.ValidationError);
    }
);

/* ABBREVIATIONS */
test.each([
    ['t'],
    ['test'],
    [new Array(256).join('a')], // 255 Character string.
])(
    '%p is a valid coin variety abbreviation',
    async (abbreviation: CoinStrikeData["abbreviation"]) => {
        const coinStrikeData: CoinStrikeData = {
            id: 1,
            title: 'test',
            abbreviation: abbreviation,
        }

        expect(await (new CoinStrike(coinStrikeData)).validate()).toBe(true);
    }
);

test.each([
    [''],
    [new Array(257).join('a')], // 256 Character string.
])(
    '%p is an invalid coin variety abbreviation',
    async (abbreviation: CoinStrikeData["abbreviation"]) => {
        const coinStrike = new CoinStrike({
            id: 1,
            title: 'test',
            abbreviation: abbreviation,
        });

        await expect(async () => {
            await coinStrike.validate()
        }).rejects.toThrow(Joi.ValidationError);
    }
);