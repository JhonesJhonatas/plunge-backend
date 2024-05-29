export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {},
  extensionsToTreatAsEsm: ['.ts'],
  coverageReporters: ['json', 'html', 'text'],
  setupFiles: ['./src/shared/tests/@setup/index.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@user/(.*)$': '<rootDir>/src/modules/user/$1',
    '^@topic/(.*)$': '<rootDir>/src/modules/topic/$1',
    '^@post/(.*)$': '<rootDir>/src/modules/post/$1',
    '^@comment/(.*)$': '<rootDir>/src/modules/comment/$1',
  },
}
