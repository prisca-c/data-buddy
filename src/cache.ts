import { CacheInterface } from './types/cache_interface.js'

export class Cache implements CacheInterface {
  protected cache: Map<string, object>

  constructor() {
    this.cache = new Map()
  }

  get(key: string): object | undefined {
    return this.cache.get(key)
  }

  set(key: string, value: object, ttl?: number): void {
    this.cache.set(key, value)
    if (ttl) {
      setTimeout(() => {
        this.cache.delete(key)
      }, ttl)
    }
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }
}
