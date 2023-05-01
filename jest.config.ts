export {};

module.exports = {
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "esModuleInterop": true,
    "extensionsToTreatAsEsm": [".ts", ".tsx"],
    "testEnvironment": 'jest-environment-jsdom'
  }