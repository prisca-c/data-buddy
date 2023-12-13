import * as fs from 'fs/promises'

type ReturnData = Object | null

/**
 * Interface for the DataBuddy class.
 * @interface
 */
export interface IDataBuddy {
  /**
   * Reads a file and returns its content.
   * @param {string} path - The path to the file.
   * @param {string} filename - The name of the file.
   * @returns {Promise<ReturnData>} The content of the file or null if the file does not exist.
   */
  read(path: string, filename: string): Promise<ReturnData>

  /**
   * Creates a new file with the given data.
   * @param {string} path - The path to the file.
   * @param {string} filename - The name of the file.
   * @param {object} data - The data to write to the file.
   * @returns {Promise<ReturnData>} The content of the new file or an error if the file already exists.
   */
  create(path: string, filename: string, data: object): Promise<ReturnData>

  /**
   * Updates an existing file with the given data.
   * @param {string} path - The path to the file.
   * @param {string} filename - The name of the file.
   * @param {any} data - The data to write to the file.
   * @returns {Promise<ReturnData>} The content of the updated file or an error if the file does not exist.
   */
  update(path: string, filename: string, data: object): Promise<ReturnData>

  /**
   * Deletes a file.
   * @param {string} path - The path to the file.
   * @param {string} filename - The name of the file.
   * @returns {Promise<boolean>} True if the file was deleted successfully, or an error if the file does not exist.
   */
  delete(path: string, filename: string): Promise<boolean>
}

/**
 * Class implementing the IDataBuddy interface.
 * @class
 */
class DataBuddy implements IDataBuddy {
  async read(path: string, filename: string): Promise<ReturnData> {
    try {
      const data = await fs.readFile(`${path}/${filename}.json`, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      return null
    }
  }

  async create(path: string, filename: string, data: object): Promise<ReturnData> {
    if (await this.read(path, filename)) {
      throw new Error(`File ${filename} already exists in ${path}`)
    }
    await fs.writeFile(`${path}/${filename}.json`, JSON.stringify(data))
    return this.read(path, filename)
  }

  async update(path: string, filename: string, data: object): Promise<ReturnData> {
    if (!(await this.read(path, filename))) {
      throw new Error(`File ${filename} does not exist in ${path}`)
    }
    await fs.writeFile(`${path}/${filename}.json`, JSON.stringify(data))
    return this.read(path, filename)
  }

  async delete(path: string, filename: string): Promise<boolean> {
    if (!(await this.read(path, filename))) {
      throw new Error(`File ${filename} does not exist in ${path}`)
    }
    await fs.unlink(`${path}/${filename}.json`)
    return true
  }
}

export { DataBuddy }
