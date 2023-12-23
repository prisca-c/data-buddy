import { KeyValuePairInterface } from './key_value_pair_interface.js'

/**
 * CacheInterface is an interface that defines the structure of a cache object.
 * It includes methods for getting, setting, deleting, and clearing cache entries,
 * as well as retrieving all entries.
 *
 * @interface
 */
export interface CacheInterface {
  /**
   * Retrieves the value of a cache entry with the specified key.
   * @param key - The key of the cache entry.
   * @returns The value of the cache entry, or undefined if the entry does not exist.
   */
  get(key: string): object | undefined

  /**
   * Sets the value of a cache entry with the specified key.
   * @param pair - The key-value pair to be set.
   */
  set(pair: KeyValuePairInterface): void

  /**
   * Deletes a cache entry with the specified key.
   * @param key - The key of the cache entry.
   * @returns A boolean indicating whether the deletion was successful.
   */
  delete(key: string): boolean

  /**
   * Clears all entries from the cache.
   */
  clear(): void

  /**
   * Retrieves all entries from the cache.
   * @returns An array of key-value pairs.
   */
  all(): Array<[string, object]>
}
