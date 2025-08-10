import fastify from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { loadEnv } from "./config/env";
import { registerSwagger } from "./plugins/swagger";
import { registerPokemonRoutes } from "./features/pokemon/routes";
import { registerMetrics } from "./plugins/metrics";
import { registerSecurity } from "./plugins/security";
import { registerJWTAuth } from "./plugins/jwtAuth";

async function bootstrap() {
  const env = loadEnv();
  const { PORT, HOST } = env;

  const app = fastify({
    logger: {
      level: env.NODE_ENV === "development" ? "debug" : "info",
      transport:
        env.NODE_ENV === "production"
          ? undefined
          : {
              target: "pino-pretty",
            },
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  // Plugins
  await app.register(registerSecurity, { corsOrigin: env.CORS_ORIGIN });
  await app.register(registerSwagger);
  await app.register(registerMetrics);
  await app.register(registerJWTAuth);

  // Routes
  app.get("/healthcheck", (req, res) => {
    res.send({ message: "Success" });
  });

  await app.register(async (protectedApp) => {
    protectedApp.addHook("onRequest", protectedApp.verifyJwt);
    await protectedApp.register(registerPokemonRoutes, { prefix: "/api" });
  });

  await app.ready();

  const address = await app.listen({ port: PORT, host: HOST });
  console.log(`Server is running at http://${address}`);
}

bootstrap().catch((err) => {
  console.error("Error starting the server:", err);
  process.exit(1);
});
