import { Type, type Static } from "@sinclair/typebox";

export const PokemonResponseSchema = Type.Object({
  id: Type.Integer({ minimum: 1 }),
  name: Type.String({ minLength: 1 }),
  height: Type.Integer({ minimum: 0 }),
  weight: Type.Integer({ minimum: 0 }),
  types: Type.Array(Type.String()),
});

export type PokemonResponse = Static<typeof PokemonResponseSchema>;

export const PokemonListItemSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  url: Type.String({ format: "uri" }),
});

export const PokemonListSchema = Type.Object({
  count: Type.Integer({ minimum: 0 }),
  next: Type.Optional(Type.String()),
  previous: Type.Optional(Type.String()),
  results: Type.Array(PokemonListItemSchema),
});

export type PokemonList = Static<typeof PokemonListSchema>;
