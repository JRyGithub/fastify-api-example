import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import type { FastifyInstance } from "fastify";
import { buildApp } from "./helpers/app";

describe("Pokemon API Authentication Tests", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("should work without auth when skipAuth is enabled", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/pokemon/1",
    });

    expect(response.statusCode).toBe(200);

    const pokemon = JSON.parse(response.body);
    expect(pokemon).toMatchObject({
      id: 1,
      name: "bulbasaur",
      height: expect.any(Number),
      weight: expect.any(Number),
      types: expect.any(Array),
    });
  });

  test("should return a valid JWT token from auth endpoint", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/auth/token",
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(body).toMatchObject({
      accessToken: expect.any(String),
      tokenType: "Bearer",
      expiresInSeconds: expect.any(Number),
    });
  });
});
