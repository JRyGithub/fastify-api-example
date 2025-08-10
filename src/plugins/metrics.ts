import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export async function metricsPlugin(app: FastifyInstance) {
  const metricsModule = require("fastify-metrics");

  await app.register(metricsModule, {
    endpoint: "/metrics",
    clearRegister: true,
  });
}

export const registerMetrics = fp(metricsPlugin, {
  name: "metrics-plugin",
});
