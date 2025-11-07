import { Cache } from './cache.js'
import { File } from './file.js'

/**
 * DataBuddy is the main class that provides access to cache and file operations.
 */
export class DataBuddy<FileT = unknown, CacheT = unknown> {
  private cache: Cache<CacheT>
  private file: File<FileT>

  constructor(basePath?: string) {
    this.cache = new Cache<CacheT>()
    this.file = new File<FileT>(basePath)
  }

  /**
   * Get the cache instance.
   */
  getCache(): Cache<CacheT> {
    return this.cache
  }

  /**
   * Get the file instance.
   */
  getFile(): File<FileT> {
    return this.file
  }
}
