import { LRUCache } from "lru-cache";

export const DEFAULT_CACHE_MAX_SIZE = 1000; // Maximum number of items in the cache
export const DEFAULT_CACHE_TTL = 1000 * 60 * 60; // 1 hour (How long to keep items in the cache)

export function createCache<T extends {}>(options?: LRUCache.Options<string, T, T>) {
  return new LRUCache<string, T, T>({
    max: DEFAULT_CACHE_MAX_SIZE,
    ttl: DEFAULT_CACHE_TTL,
    ...(options as LRUCache.Options<string, T, T>),
  });
}
