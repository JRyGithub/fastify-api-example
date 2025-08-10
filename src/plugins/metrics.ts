import type { FastifyInstance } from "fastify";

export async function registerMetrics(app: FastifyInstance) {
  const metricsPlugin = require("fastify-metrics");

  await app.register(metricsPlugin, {
    endpoint: "/metrics",
  });
}
