import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";

async function swaggerPlugin(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "PokeAPI Proxy",
        description: "A Fastify API that proxies requests to the PokeAPI",
        version: "0.1.0",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "Obtain via GET /auth/token. Send as 'Authorization: Bearer <token>'.",
          },
        },
      },
      security: [{ BearerAuth: [] }],
    },
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs",
  });
}

export const registerSwagger = fp(swaggerPlugin, {
  name: "swagger-plugin",
});
