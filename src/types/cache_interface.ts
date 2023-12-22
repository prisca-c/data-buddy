export interface CacheInterface {
  get(key: string): object | undefined
  set(key: string, value: object, ttl?: number): void
  delete(key: string): boolean
  clear(): void
}
