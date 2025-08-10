import fastify, { type FastifyInstance, type FastifyServerOptions } from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { loadEnv } from "./config/env";
import { registerSwagger } from "./plugins/swagger";
import { registerPokemonRoutes } from "./features/pokemon/routes";
import { registerMetrics } from "./plugins/metrics";
import { registerSecurity } from "./plugins/security";
import { registerJWTAuth } from "./plugins/jwtAuth";

export default async function build(
  opts = {} as FastifyServerOptions & { skipAuth?: boolean; skipMetrics?: boolean },
): Promise<FastifyInstance> {
  const env = loadEnv();

  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

  // Plugins
  await app.register(registerSecurity, { corsOrigin: env.CORS_ORIGIN });
  await app.register(registerSwagger);

  if (!opts.skipMetrics) {
    await app.register(registerMetrics);
  }

  await app.register(registerJWTAuth);

  // Routes
  app.get("/healthcheck", (req, res) => {
    res.send({ message: "Success" });
  });

  if (opts.skipAuth) {
    await app.register(registerPokemonRoutes, { prefix: "/api" });
  } else {
    await app.register(async (protectedApp) => {
      protectedApp.addHook("onRequest", protectedApp.verifyJwt);
      await protectedApp.register(registerPokemonRoutes, { prefix: "/api" });
    });
  }

  await app.ready();

  return app;
}
