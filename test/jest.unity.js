module.exports = {
    rootDir: '../',
    moduleFileExtensions: ['json', 'ts', 'tsx', 'js', 'jsx'],
    setupFiles: ['<rootDir>/test/jest.setup.js'],
    moduleNameMapper: {
        '^src(.*)$': '<rootDir>/src$1',
        '^test(.*)$': '<rootDir>/test$1',
    },
    transform: {
        '\\.tsx?$': 'ts-jest',
        '\\.jsx?$': 'babel-jest',
    },
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.json',
        },
    },
    // preset: 'ts-jest',
    testRegex: '.spec.(tsx?|ts?)$',
    testPathIgnorePatterns: ['../node_modules/'],
};
