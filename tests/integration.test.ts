import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { buildApp } from "./helpers/app";
import type { FastifyInstance } from "fastify";

describe("Application Integration", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("should start server successfully", async () => {
    expect(app).toBeDefined();
    expect(app.hasRoute).toBeDefined();
  });

  test("should have Swagger documentation available", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/docs",
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
  });
});
