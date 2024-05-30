export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { config: './ts-jest.config.json' }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  coverageReporters: ['json', 'html', 'text'],
  setupFiles: ['./src/shared/tests/@setup/index.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@user/(.*)$': '<rootDir>/src/modules/user/$1',
    '^@topic/(.*)$': '<rootDir>/src/modules/topic/$1',
    '^@post/(.*)$': '<rootDir>/src/modules/post/$1',
    '^@comment/(.*)$': '<rootDir>/src/modules/comment/$1',
  },
}
