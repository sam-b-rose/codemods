const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  testRegex: '^.+\\.spec\\.(tsx|ts|js)$',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testPathIgnorePatterns: ['/node_modules/'],
};
