import CoinVariety, {type CoinVarietyJson} from './coin-variety';
import Joi from 'joi';

// Object instantiation tests.
test('coin variety instantiation without id', () => {
    expect(() => new CoinVariety({title: 'test'})).toThrow(ReferenceError);
});
test('coin variety instantiation without title', () => {
    expect(() => new CoinVariety({id: 1})).toThrow(ReferenceError);
});
test('coin variety instantiation with id and title', () => {
    const coinVariety = new CoinVariety({id: 1, title: 'test'});
    expect(coinVariety instanceof CoinVariety).toBe(true);
});
test('coin variety instantiation with id, title, and description', () => {
    const coinVariety = new CoinVariety({id: 1, title: 'test', description: 'testing'});
    expect(coinVariety instanceof CoinVariety).toBe(true);
});

// Invalid Coin Variety tests.
test.each([
    // Invalid ID.
    [{id: -1, title: 'test'}],
    // Invalid title, too short.
    [{id: 1, title: ''}],
    // Invalid title, too long.
    [{id: 1, title: Array(257).join('a')}],
    // Invalid description, too short.
    [{id: 1, title: 'test', description: ''}],
    // Invalid description, too long.
    [{id: 1, title: 'test', description: Array(1002).join('a')}],
])('%p is an invalid coin variety', async (coinVarietyJson: CoinVarietyJson) => {
    await expect(async () => {
        await new CoinVariety(coinVarietyJson).validate()
    }).rejects.toThrow(Joi.ValidationError);
});

// Valid Coin Variety tests.
test.each([
    [{id: 1, title: 't'}],
    [{id: 1, title: 'test'}],
    [{id: 1, title: new Array(256).join('a')}],
    [{id: 1, title: 'test', description: 'a'}],
    [{id: 1, title: 'test', description: 'test'}],
    [{id: 1, title: 'test', description: Array(1001).join('a')}],
])('%p is a valid coin variety', async (coinVarietyJson: CoinVarietyJson) => {
    expect(await new CoinVariety(coinVarietyJson).validate()).toBe(true);
});