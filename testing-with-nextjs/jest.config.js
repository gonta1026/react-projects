module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  moduleNameMapper: {
    // test 時に CSS ファイルを読み込まないようにする設定
    // '\\.css$': '<rootDir>/node_modules/jest-css-modules',
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
};
