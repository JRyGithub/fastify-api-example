import type { FastifyInstance } from "fastify";
import { ParamsByName, QueryList } from "../../lib/types";
import {
  PokemonResponseSchema,
  PokemonListSchema,
  type PokemonResponse,
  type PokemonList,
} from "./types";
import { fetchPokemon, fetchPokemonList } from "../../lib/pokeapi";

export async function registerPokemonRoutes(app: FastifyInstance) {
  app.get<{ Params: ParamsByName; Reply: PokemonResponse | string }>("/pokemon/:name", {
    schema: {
      operationId: "getPokemonByName",
      params: ParamsByName,
      summary: "Get Pokémon by name or ID",
      description: "Fetches a Pokémon by its name or ID from the PokeAPI.",
      tags: ["pokemon"],
      response: {
        200: PokemonResponseSchema,
        404: { type: "string", description: "Pokémon not found" },
        500: { type: "string", description: "Internal server error" },
      },
    },
    handler: async (request, reply) => {
      try {
        const data = await fetchPokemon(request.params.name);

        const parsedData: PokemonResponse = {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: data.types.map((type) => type.type.name),
        };

        return reply.status(200).send(parsedData);
      } catch (err: any) {
        console.error("Error in pokemon handler:", err);
        request.log.warn({ err }, "Failed to fetch pokemon");
        if (err?.status === 404 || err?.message.includes("Not Found"))
          return reply.status(404).send("Pokémon not found");
        return reply.status(500).send("Upstream error");
      }
    },
  });

  app.get<{ Querystring: QueryList; Reply: PokemonList | string }>("/pokemon", {
    schema: {
      operationId: "listPokemon",
      querystring: QueryList,
      summary: "List Pokémon",
      description: "Fetches a list of Pokémon with pagination support.",
      tags: ["pokemon"],
      response: {
        200: PokemonListSchema,
        500: { type: "string", description: "Internal server error" },
      },
    },
    handler: async (request, reply) => {
      try {
        const { limit = 20, offset = 0 } = request.query;
        const data = await fetchPokemonList(limit, offset);

        const transformedData: PokemonList = {
          count: data.count,
          next: data.next || undefined,
          previous: data.previous || undefined,
          results: data.results,
        };

        return reply.status(200).send(transformedData);
      } catch (err: any) {
        console.error("Error in pokemon list handler:", err);
        request.log.warn({ err }, "Failed to fetch pokemon list");
        return reply.status(500).send("Upstream error");
      }
    },
  });
}
