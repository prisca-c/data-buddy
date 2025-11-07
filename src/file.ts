import * as fs from 'node:fs/promises'
import { DataBuddyUtils } from './data_buddy_utils.js'
import type { FileInterface, BaseParams, ReturnData, UpsertParams } from './types/file_interface.js'

/**
 * Class implementing the FileInterface interface.
 * @class
 * @implements {FileInterface}
 */
export class File<T = unknown> extends DataBuddyUtils implements FileInterface<T> {
  constructor(basePath?: string) {
    super()
    if (basePath) {
      this.isValidPath(basePath)
      this.basePath = basePath
    }
  }

  async read({ path, filename }: BaseParams): Promise<ReturnData<T>> {
    try {
      this.validatePathAndFilename(path, filename)
      const workingPath = this.workingPath(path)
      const data = await fs.readFile(`${workingPath}/${filename}.json`, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null
      } else {
        throw error
      }
    }
  }

  async create({ path, filename, data }: UpsertParams<T>): Promise<ReturnData<T>> {
    this.validatePathAndFilename(path, filename)
    const sanitizedData = this.sanitizeData(data)
    const workingPath = this.workingPath(path)

    if (await this.read({ path, filename })) {
      throw new Error(`File ${filename} already exists in ${workingPath}`)
    }
    await fs.mkdir(workingPath, { recursive: true })
    await fs.writeFile(`${workingPath}/${filename}.json`, JSON.stringify(sanitizedData, null, 4))
    return this.read({ path, filename })
  }

  async update(params: BaseParams & { data: T; mode?: 'replace' }): Promise<ReturnData<T>>
  async update(params: BaseParams & { data: Partial<T>; mode: 'merge' }): Promise<ReturnData<T>>
  async update({
    path,
    filename,
    data,
    mode = 'replace',
  }: BaseParams & { data: T | Partial<T>; mode?: 'replace' | 'merge' }): Promise<ReturnData<T>> {
    this.validatePathAndFilename(path, filename)
    const workingPath = this.workingPath(path)

    if (!(await this.read({ path, filename }))) {
      throw new Error(`File ${filename} does not exist in ${workingPath}`)
    }

    let updatedData: T
    if (mode === 'merge') {
      const currentData = await this.read({ path, filename })
      if (!currentData) {
        throw new Error(`File ${filename} does not exist in ${workingPath}`)
      }
      updatedData = { ...currentData, ...data }
    } else {
      updatedData = data as T
    }

    await fs.writeFile(`${workingPath}/${filename}.json`, JSON.stringify(updatedData, null, 4))
    return this.read({ path, filename })
  }

  async delete({ path, filename }: BaseParams): Promise<boolean> {
    this.validatePathAndFilename(path, filename)
    const workingPath = this.workingPath(path)

    try {
      await fs.unlink(`${workingPath}/${filename}.json`)
      return true
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false
      } else {
        throw error
      }
    }
  }

  async isValidJson({ path, filename }: BaseParams): Promise<boolean> {
    try {
      const data = await this.read({ path, filename })
      return data !== null
    } catch {
      return false
    }
  }

  async isValidData({
    path,
    filename,
    validator,
  }: BaseParams & { validator?: (data: unknown) => boolean }): Promise<boolean> {
    try {
      const data = await this.read({ path, filename })
      if (data === null) return false
      if (validator) {
        return validator(data)
      }
      // If no validator, just check if it's valid JSON (already done by read)
      return true
    } catch {
      return false
    }
  }
}
