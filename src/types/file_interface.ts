export type ReturnData<T = unknown> = T | null
export type BaseParams = { path: string; filename: string }
export type UpsertParams<T = unknown> = BaseParams & { data: T }

/**
 * `FileInterface` is an interface that defines the structure for the `DataBuddy` class.
 * It includes methods for reading, creating, updating, and deleting data.
 *
 * @interface
 */
export interface FileInterface<T = unknown> {
  /**
   * The `read` method is used to read data from a file.
   * It takes an object with `path` and `filename` properties as an argument.
   * The `path` is the directory where the file is located and `filename` is the name of the file.
   * It returns a Promise that resolves with the data read from the file or null if an error occurs.
   *
   * @param {BaseParams} { path, filename }
   * @returns {Promise<ReturnData<T>>}
   */
  read({ path, filename }: BaseParams): Promise<ReturnData<T>>

  /**
   * The `create` method is used to create a new file with the provided data.
   * It takes an object with `path`, `filename`, and `data` properties as an argument.
   * The `path` is the directory where the file will be created, `filename` is the name of the file, and `data` is the data to be written to the file.
   * It returns a Promise that resolves with the data written to the file or null if an error occurs.
   *
   * @param {UpsertParams<T>} { path, filename, data }
   * @returns {Promise<ReturnData<T>>}
   */
  create({ path, filename, data }: UpsertParams<T>): Promise<ReturnData<T>>

  /**
   * The `update` method is used to update the data in an existing file.
   * It takes an object with `path`, `filename`, and `data` properties as an argument.
   * The `path` is the directory where the file is located, `filename` is the name of the file, and `data` is the new data to be written to the file.
   * It returns a Promise that resolves with the updated data from the file or null if an error occurs.
   *
   * @param {UpsertParams<T>} { path, filename, data }
   * @returns {Promise<ReturnData<T>>}
   */
  update({ path, filename, data }: UpsertParams<T>): Promise<ReturnData<T>>

  /**
   * The `delete` method is used to delete a file.
   * It takes an object with `path` and `filename` properties as an argument.
   * The `path` is the directory where the file is located and `filename` is the name of the file.
   * It returns a Promise that resolves with a boolean indicating whether the deletion was successful.
   *
   * @param {BaseParams} { path, filename }
   * @returns {Promise<boolean>}
   */
  delete({ path, filename }: BaseParams): Promise<boolean>
}
