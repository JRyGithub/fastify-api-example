import type { LRUCache } from "lru-cache";

export async function getJson<T extends {}>(
  url: string,
  config: RequestInit = {},
  cache?: LRUCache<string, T, T>,
): Promise<T> {
  if (cache) {
    const cached = cache.get(url);
    if (cached) {
      return cached;
    }
  }

  const response = await fetch(url, config);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upstream error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as T;

  if (cache) {
    cache.set(url, data);
  }
  return data;
}
