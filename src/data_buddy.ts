import * as fs from 'node:fs/promises'

interface IData {
  read(path: string, filename: string): Promise<Object | null>
  create(path: string, filename: string, data: any): Promise<any>
  update(path: string, filename: string, data: any): Promise<any>
}

export class DataBuddy implements IData {
  async read(path: string, filename: string): Promise<Object | null> {
    const fileData = `${path}/${filename}.json`
    try {
      const data = await fs.readFile(fileData, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      return null
    }
  }

  async create(path: string, filename: string, data: any): Promise<any> {
    const fileData = `${path}/${filename}.json`

    const fileExists = await this.read(path, filename)
    if (fileExists) {
      throw new Error(`File "${filename}" already exists in "${path}"`)
    } else {
      try {
        const newData = JSON.stringify(data)
        await fs.writeFile(fileData, newData)
        return this.read(path, filename)
      } catch (error: any) {
        throw new Error(error)
      }
    }
  }

  async update(
    path: string,
    filename: string,
    data: any
  ): Promise<{
    [key: string]: any
  } | null> {
    const fileData = `${path}/${filename}.json`

    const fileExists = await this.read(path, filename)
    if (!fileExists) {
      throw new Error(`File "${filename}" does not exist in "${path}"`)
    }

    try {
      const newData = JSON.stringify(data)
      await fs.writeFile(fileData, newData)
      return this.read(path, filename)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
