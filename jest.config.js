/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
    testEnvironment: 'node',
    moduleNameMapper: {
        "^\\$lib/(.*)": "<rootDir>/src/lib/$1",
    },
};