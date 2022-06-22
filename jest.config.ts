const config = {
  moduleNameMapper: {
    "\\.module\\.scss$": "<rootDir>/src/utils/testing/mocks/scss-modules.ts",
    "^#components(.*)$": "<rootDir>/src/components$1",
    "^#machines(.*)$": "<rootDir>/src/machines$1",
    "^#mocks(.*)$": "<rootDir>/src/mocks$1",
    "^#utils(.*)$": "<rootDir>/src/utils$1",
    "^#views(.*)$": "<rootDir>/src/views$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  testEnvironment: "jsdom", // TODO: If will be any errors, try 'jest-environment-jsdom'.
}

export default config
