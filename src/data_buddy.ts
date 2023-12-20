import * as fs from 'node:fs/promises'
import { DataBuddyUtils } from './data_buddy_utils.js'
import type {
  DataBuddyInterface,
  BaseParams,
  ReturnData,
  UpsertParams,
} from './types/DataBuddyInterface.js'

/**
 * Class implementing the IDataBuddy interface.
 * @class
 */
export class DataBuddy extends DataBuddyUtils implements DataBuddyInterface {
  async read({ path, filename }: BaseParams): Promise<ReturnData> {
    try {
      this.validatePathAndFilename(path, filename)
      const data = await fs.readFile(`${path}/${filename}.json`, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      return null
    }
  }

  async create({ path, filename, data }: UpsertParams): Promise<ReturnData> {
    this.validatePathAndFilename(path, filename)
    const sanitizedData = this.sanitizeData(data)

    if (await this.read({ path, filename })) {
      throw new Error(`File ${filename} already exists in ${path}`)
    }
    await fs.writeFile(`${path}/${filename}.json`, JSON.stringify(sanitizedData))
    return this.read({ path, filename })
  }

  async update({ path, filename, data }: UpsertParams): Promise<ReturnData> {
    this.validatePathAndFilename(path, filename)
    const sanitizedData = this.sanitizeData(data)

    if (!(await this.read({ path, filename }))) {
      throw new Error(`File ${filename} does not exist in ${path}`)
    }
    await fs.writeFile(`${path}/${filename}.json`, JSON.stringify(sanitizedData))
    return this.read({ path, filename })
  }

  async delete({ path, filename }: BaseParams): Promise<boolean> {
    this.validatePathAndFilename(path, filename)

    if (!(await this.read({ path, filename }))) {
      throw new Error(`File ${filename} does not exist in ${path}`)
    }
    await fs.unlink(`${path}/${filename}.json`)
    return true
  }
}
