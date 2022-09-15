module.exports = {
  bail: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!**/node_modules/**"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleDirectories: ["node_modules"],
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: { url: "http://localhost" },
  testMatch: ["**/*.test.{ts,tsx}"],
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          sourceMap: true,
          target: "es6",
        },
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!intl-messageformat|intl-messageformat-parser).+\\.js$",
  ],
  verbose: true,
};
