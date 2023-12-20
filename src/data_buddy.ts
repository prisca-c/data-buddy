import * as fs from 'node:fs/promises'
import { DataBuddyUtils } from './data_buddy_utils.js'
import type {
  DataBuddyInterface,
  BaseParams,
  ReturnData,
  UpsertParams,
} from './types/data_buddy_interface.js'

/**
 * Class implementing the IDataBuddy interface.
 * @class
 */
export class DataBuddy extends DataBuddyUtils implements DataBuddyInterface {
  constructor(basePath?: string) {
    super()
    if (basePath) {
      this.isValidPath(basePath)
      this.basePath = basePath
    }
  }

  async read({ path, filename }: BaseParams): Promise<ReturnData> {
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

  async create({ path, filename, data }: UpsertParams): Promise<ReturnData> {
    this.validatePathAndFilename(path, filename)
    const sanitizedData = this.sanitizeData(data)
    const workingPath = this.workingPath(path)

    if (await this.read({ path, filename })) {
      throw new Error(`File ${filename} already exists in ${workingPath}`)
    }
    await fs.writeFile(`${workingPath}/${filename}.json`, JSON.stringify(sanitizedData))
    return this.read({ path, filename })
  }

  async update({ path, filename, data }: UpsertParams): Promise<ReturnData> {
    this.validatePathAndFilename(path, filename)
    const sanitizedData = this.sanitizeData(data)
    const workingPath = this.workingPath(path)

    if (!(await this.read({ path, filename }))) {
      throw new Error(`File ${filename} does not exist in ${workingPath}`)
    }
    await fs.writeFile(`${workingPath}/${filename}.json`, JSON.stringify(sanitizedData))
    return this.read({ path, filename })
  }

  async delete({ path, filename }: BaseParams): Promise<boolean> {
    this.validatePathAndFilename(path, filename)
    const workingPath = this.workingPath(path)

    if (!(await this.read({ path, filename }))) {
      throw new Error(`File ${filename} does not exist in ${workingPath}`)
    }
    await fs.unlink(`${workingPath}/${filename}.json`)
    return true
  }
}
