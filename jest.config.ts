const config = {
  moduleNameMapper: {
    "\\.module\\.scss$": "<rootDir>/src/utils/testing/mocks/scss-modules.ts",
    "^#components(.*)$": "<rootDir>/src/components$1",
    "^#mocks(.*)$": "<rootDir>/src/mocks$1",
    "^#utils(.*)$": "<rootDir>/src/utils$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  testEnvironment: "jsdom",
}

export default config
