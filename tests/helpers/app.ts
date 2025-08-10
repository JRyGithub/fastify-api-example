import build from "../../src/app";

export async function buildApp() {
  // Reuse main app builder with test-specific options
  return await build({
    logger: false, // Disable logging in tests
    skipAuth: true, // Skip JWT auth for tests
    skipMetrics: true, // Skip metrics to avoid registration conflicts
  });
}

export async function buildAuthenticatedApp() {
  // Build app with authentication enabled
  return await build({
    logger: false, // Disable logging in tests
    skipMetrics: true, // Skip metrics to avoid registration conflicts
    // skipAuth: false (default) - keeps auth enabled
  });
}
