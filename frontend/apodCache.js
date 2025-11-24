const LRU = require('lru-cache');

function createCache(options = {}) {
  const max = options.max || parseInt(process.env.CACHE_MAX_ITEMS, 10) || 200;
  const ttl = (options.ttlSeconds || parseInt(process.env.CACHE_TTL_SECONDS, 10) || 86400) * 1000; // ms

  const cache = new LRU({
    max,
    ttl,
  });

  return {
    get: (key) => cache.get(key),
    set: (key, value) => cache.set(key, value),
    del: (key) => cache.delete(key),
    keys: () => cache.keys(),
    size: () => cache.size,
  };
}

module.exports = createCache;
