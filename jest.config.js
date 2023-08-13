module.exports = {
  roots: ['<rootDir>'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}