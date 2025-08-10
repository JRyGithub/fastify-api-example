import { z } from "zod";
import { createCache } from "./cache";
import { getJson } from "./api";

export const PokemonSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  height: z.number().int().nonnegative(),
  weight: z.number().int().nonnegative(),
  types: z.array(z.object({ type: z.object({ name: z.string() }) })),
});
export type Pokemon = z.infer<typeof PokemonSchema>;

export const PokemonListSchema = z.object({
  count: z.number().int().nonnegative(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(z.object({ name: z.string(), url: z.string() })),
});

export type PokemonList = z.infer<typeof PokemonListSchema>;

const pokemonListCache = createCache<PokemonList>({ max: 250 });
const pokemonCache = createCache<Pokemon>({ max: 250 });

const API_BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(
  limit: number = 20,
  offset: number = 0,
): Promise<PokemonList> {
  const safeLimit = Math.max(1, Math.min(200, Math.trunc(limit)));
  const safeOffset = Math.max(0, Math.trunc(offset));
  const url = `${API_BASE_URL}/pokemon?limit=${safeLimit}&offset=${safeOffset}`;

  return await getJson<PokemonList>(url, {}, pokemonListCache);
}

export async function fetchPokemon(nameOrId: string): Promise<Pokemon> {
  const key = nameOrId.trim().toLowerCase();
  const url = `${API_BASE_URL}/pokemon/${key}`;
  return await getJson<Pokemon>(url, {}, pokemonCache);
}
