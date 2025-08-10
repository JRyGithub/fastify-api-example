import { Type, type Static } from "@sinclair/typebox";

export const ParamsByName = Type.Object({ name: Type.String({ minLength: 1 }) });
export type ParamsByName = Static<typeof ParamsByName>;

export const QueryList = Type.Object({
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 200 })),
  offset: Type.Optional(Type.Integer({ minimum: 0 })),
});
export type QueryList = Static<typeof QueryList>;
