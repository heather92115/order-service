const { npm_lifecycle_event: lifecycleEvent } = process.env;

const isIntegration = lifecycleEvent && lifecycleEvent.includes('e2e');
const integrationTestModuleIgnorePatterns = [
  '<rootDir>/src/__mocks__',
  '<rootDir>/src/.*/__mocks__',
  '<rootDir>/test/__fixtures__',
];
const modulePathIgnorePatterns = [
  // NOTE: Always ignore dist files in the tests...
  '<rootDir>/dist',
  // ...and selectively ignore mocks, in integration.
  ...(isIntegration ? integrationTestModuleIgnorePatterns : []),
];

// NOTE: Set the global test timeout insanely high.
// We do this to prevent "near-miss" successes in integration test cases.
// If a more reasonable or specific timeout is needed, it should be set on
// individual test cases or in the service code.
const testTimeout = 10 * 60 * 1000;

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  // NOTE: Depending on the test command, either run unit or integration tests.
  testRegex: `test/${isIntegration ? 'integration' : 'unit'}/.*\\.spec\\.ts$`,
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: './coverage',
  coverageReporters: ['json', 'lcov', 'clover'],
  moduleNameMapper: {
    '^__mocks__/(.*)$': '<rootDir>/src/__mocks__/$1',
    '^config/(.*)$': '<rootDir>/src/config/$1',
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^decorators/(.*)$': [
      '<rootDir>/src/decorators/$1',
      '<rootDir>/src/graphql/decorators/$1',
    ],
    '^enums/(.*)$': '<rootDir>/src/graphql/enums/$1',
    '^factories/(.*)$': '<rootDir>/test/factories/$1',
    '^guards/(.*)$': '<rootDir>/src/auth/guards/$1',
    '^helpers/(.*)$': '<rootDir>/test/helpers/$1',
    '^interceptors/(.*)$': '<rootDir>/src/interceptors/$1',
    '^loggers/(.*)$': '<rootDir>/src/loggers/$1',
    '^middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^models/(.*)$': '<rootDir>/src/graphql/models/$1',
    '^resolvers/(.*)$': '<rootDir>/src/graphql/resolvers/$1',
    '^repositories/(.*)$': '<rootDir>/src/repositories/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^strategy/(.*)$': '<rootDir>/src/auth/strategy/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
    '^__fixtures__/(.*)$': '<rootDir>/test/__fixtures__/$1',
    // (rosschapman 2022-11-29): Axios is a dependency of @thirtymadison/drug-database-sdk. Jest
    // support for ESM is unstable in our current version. Module lookup must use CJS, even for
    // dependencies of dependencies.
    // See: https://github.com/axios/axios/issues/5101#issuecomment-1276572468
    '^axios$': require.resolve('axios'),
  },
  modulePathIgnorePatterns,
  testEnvironment: 'node',
  testTimeout,
  timers: 'fake',
};
