// Global test setup for Bun
import { beforeAll, afterAll } from "bun:test";

// Global test setup
beforeAll(() => {
  // Setup that runs before all tests
});

afterAll(() => {
  // Cleanup that runs after all tests
});

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: () => {},
  debug: () => {},
  info: () => {},
};
