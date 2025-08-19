// Jest configuration for a Next.js + TypeScript project
// This file is .js because Jest expects config in JavaScript by default.
// You can use .ts, but it requires extra setup.
import nextJest from "next/jest.js";

// Create a Jest config using Next.js's helper for better compatibility
const createJestConfig = nextJest({
  dir: "./", // Project root directory
});

const config = {
  // Use jsdom to simulate browser environment for React components
  testEnvironment: "jest-environment-jsdom",

  // Setup file for extending Jest with custom matchers (e.g., @testing-library/jest-dom)
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Only run test files in __tests__ folders with .spec or .test extensions
  testMatch: ["**/__tests__/**/*.(spec|test).(ts|tsx)"],

  // Ignore node_modules when searching for tests
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],

  // Map @/ imports to src/ folder (adjust if your code is in another folder)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  // Recognize these file extensions for modules
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};

// Export the final Jest config
export default createJestConfig(config);
