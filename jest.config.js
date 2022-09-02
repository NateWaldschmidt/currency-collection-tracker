/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Mapping to SvelteKit's $lib directory mapping.
  moduleNameMapper: {
    "^\\$lib/(.*)": "<rootDir>/src/lib/$1",
  },
};