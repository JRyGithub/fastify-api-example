import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import type { FastifyInstance } from "fastify";

export async function registerSecurity(app: FastifyInstance, opts: { corsOrigin: string }) {
  await app.register(helmet, { contentSecurityPolicy: false });

  await app.register(cors, {
    origin: opts.corsOrigin === "*" ? true : opts.corsOrigin,
    credentials: false,
  });

  await app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
    addHeaders: {
      "x-ratelimit-limit": true,
      "x-ratelimit-remaining": true,
      "x-ratelimit-reset": true,
    },
  });
}
