module.exports = {
    rootDir: '../',
    moduleFileExtensions: ['json', 'ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
        '^src(.*)$': '<rootDir>/src$1',
        '^test(.*)$': '<rootDir>/test$1',
    },
    transform: {
        '\\.tsx?$': 'ts-jest',
    },
    testRegex: '.spec.(tsx?|ts?)$',
    testPathIgnorePatterns: ['../node_modules/'],
};
