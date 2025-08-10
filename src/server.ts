import build from "./app";
import { loadEnv } from "./config/env";

async function start() {
  const env = loadEnv();
  console.log("Environment loaded:", env.NODE_ENV);

  const server = await build({
    logger:
      env.NODE_ENV === "development"
        ? {
            level: "debug",
            transport: {
              target: "pino-pretty",
              options: {
                colorize: true,
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
              },
            },
          }
        : {
            level: "info",
          },
  });

  server.log.info("Starting server...");

  server.listen({ port: env.PORT, host: env.HOST }, (error, address) => {
    if (error) {
      server.log.error(error);
      process.exit(1);
    }
  });
}

start().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});
