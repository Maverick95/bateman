/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "jest",
  coverageAnalysis: "perTest",
  ignorePatterns: [
    "dist",
    "coverage",
    "examples",
    "src/Data",
    "src/Models",
    "src/*.*",
  ],
  jest: {
    "configFile": "jest.config.stryker.js",
  },
};
