import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import type { FastifyInstance } from "fastify";
import { buildApp } from "./helpers/app";

describe("Pokemon API", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("GET /api/pokemon/:name", () => {
    test("should return pokemon data for valid ID", async () => {
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

    test("should return pokemon data for valid name", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/pokemon/pikachu",
      });

      expect(response.statusCode).toBe(200);

      const pokemon = JSON.parse(response.body);
      expect(pokemon).toMatchObject({
        id: 25,
        name: "pikachu",
        height: expect.any(Number),
        weight: expect.any(Number),
        types: expect.any(Array),
      });
    });

    test("should return 404 for invalid pokemon", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/pokemon/invalidpokemon",
      });

      expect(response.statusCode).toBe(404);
      expect(response.body).toBe("Pokémon not found");
    });
  });

  describe("GET /api/pokemon (list)", () => {
    test("should return list of pokemon", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/pokemon?limit=20&offset=0",
      });

      const pokemonList = JSON.parse(response.body);

      expect(Array.isArray(pokemonList.results)).toBe(true);
      expect(pokemonList.results?.length).toBeGreaterThan(0);
      expect(pokemonList.results[0]).toMatchObject({
        name: expect.any(String),
        url: expect.any(String),
      });
    });

    test("should support pagination", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/pokemon?limit=5&offset=10",
      });

      expect(response.statusCode).toBe(200);

      const pokemonList = JSON.parse(response.body);
      expect(Array.isArray(pokemonList.results)).toBe(true);
      expect(pokemonList.results.length).toBeLessThanOrEqual(5);
    });
  });
});
