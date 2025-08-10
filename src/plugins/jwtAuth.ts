import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "@fastify/jwt";
import { loadEnv } from "../config/env";
import fp from "fastify-plugin";

type VerifyJwtHook = (req: FastifyRequest, reply: FastifyReply) => Promise<void> | void;

declare module "fastify" {
  interface FastifyInstance {
    verifyJwt: VerifyJwtHook;
  }
}

export async function jwtPlugin(app: FastifyInstance) {
  const env = loadEnv();

  await app.register(jwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: `${env.JWT_TTL_MIN}m` },
  });

  app.get(
    "/auth/token",
    {
      schema: {
        summary: "Issue a temporary JWT access token",
        description:
          "Returns a JWT valid for JWT_TTL_MIN minutes. Send it as 'Authorization: Bearer <token>'.",
        security: [],
        response: {
          200: {
            type: "object",
            properties: {
              accessToken: { type: "string" },
              tokenType: { type: "string", enum: ["Bearer"] },
              expiresInSeconds: { type: "number" },
            },
          },
        },
        tags: ["auth"],
      },
      config: { rateLimit: { max: 5, timeWindow: "1 minute" } },
    },
    async (_req, reply) => {
      const token = await app.jwt.sign({ sub: crypto.randomUUID(), scope: "poke:read" });
      return reply.send({
        accessToken: token,
        tokenType: "Bearer",
        expiresInSeconds: env.JWT_TTL_MIN * 60,
      });
    },
  );

  const verifyJwt: VerifyJwtHook = async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch (_err) {
      reply.code(401).send({ error: "Unauthorized", message: "Invalid or expired token" });
    }
  };

  app.decorate("verifyJwt", verifyJwt);
}

export const registerJWTAuth = fp(jwtPlugin, {
  name: "jwt-plugin",
});
