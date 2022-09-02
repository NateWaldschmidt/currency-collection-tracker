import CollectionCoin, { type CollectionCoinJson } from '$lib/models/collection-coin';

// Instantiation tests.
test.each([
    [{}],
    [{ id: 1 }],
    [{ id: 1, user_id: 1 }],
    [{ id: 1, user_id: 1, coin_id: 1 }],
    [{ id: 1, user_id: 1, coin_id: 1, coin: jest.mock('$lib/models/coin') }],
])(
    '%p is an invalid instantiation of a Collection Coin',
    async (ccJson: CollectionCoinJson) => {
        expect(() => new CollectionCoin(ccJson)).toThrow(ReferenceError);
    }
);