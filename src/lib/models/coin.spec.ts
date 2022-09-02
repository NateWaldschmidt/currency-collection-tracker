import Coin, { type CoinJson } from '$lib/models/coin';

// Instantiation tests.
test('coin instantiation with empty JSON object', () => {
    const coinJson: CoinJson = {};
    expect(() => new Coin(coinJson)).toThrow(ReferenceError);
});
test('coin instantiation with only ID', () => {
    const coinJson: CoinJson = {id: 1};
    expect(() => new Coin(coinJson)).toThrow(ReferenceError);
});
test('coin instantiation with only group ID', () => {
    const coinJson: CoinJson = {groupId: 1};
    expect(() => new Coin(coinJson)).toThrow(ReferenceError);
});
test('coin instantiation with only group ID', () => {
    const coinJson: CoinJson = {groupId: 1};
    expect(() => new Coin(coinJson)).toThrow(ReferenceError);
});