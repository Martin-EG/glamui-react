/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',

  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/components/Icon/Icon.tsx',
    '<rootDir>/src/components/*/*.styles.ts',
  ],
};
