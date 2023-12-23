import { CacheInterface } from './types/cache_interface.js'
import { KeyValuePairInterface } from './types/key_value_pair_interface.js'

/**
 * Cache is a class that implements the CacheInterface interface.
 * It uses a Map object to store key-value pairs.
 * @class
 * @implements {CacheInterface}
 */
export class Cache implements CacheInterface {
  protected cache: Map<string, Omit<KeyValuePairInterface, 'key'>>

  constructor() {
    this.cache = new Map()
  }

  get(key: string): object | undefined {
    const entry = this.cache.get(key)
    if (!entry) return undefined

    const now = Date.now()
    if (entry.expiry && now >= entry.expiry) {
      this.cache.delete(key)
      return undefined
    }
    return entry.value
  }

  set(pair: KeyValuePairInterface): void {
    const expiry = pair.expiry ? Date.now() + pair.expiry : Number.POSITIVE_INFINITY
    this.cache.set(pair.key, { value: pair.value, expiry })
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }

  all(): Array<[string, object]> {
    const now = Date.now()
    return Array.from(this.cache.entries())
      .filter(([key, { expiry }]) => {
        if (expiry && now >= expiry) {
          this.cache.delete(key)
          return false
        }
        return true
      })
      .map(([key, { value }]) => [key, value])
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }
}
