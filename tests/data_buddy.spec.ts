import { File } from '../src/file.js'
import { test } from '@japa/runner'
import * as fs from 'node:fs/promises'

const dataBuddy = new File('tests')
const path = 'tmp'
const filename = 'test'
const data = { test: 'test' }

test.group('File class (success)', (group) => {
  group.each.setup(async () => {
    await fs.mkdir('tests/tmp')
  })

  group.each.teardown(async () => {
    await fs.rm('tests/tmp', { recursive: true, force: true })
  })

  test('read() should read data from a file', async ({ assert }) => {
    await dataBuddy.create({ path, filename, data })
    const fileData = await dataBuddy.read({ path, filename })
    assert.deepEqual(fileData, data)
  })

  test('create() should create a new file with the provided data', async ({ assert }) => {
    const fileData = await dataBuddy.create({ path, filename, data })
    assert.deepEqual(fileData, data)
  })

  test('update() should update the data in an existing file', async ({ assert }) => {
    const fileBase = await dataBuddy.create({ path, filename, data })
    const newData = { test: 'new test' }
    const fileData = await dataBuddy.update({ path, filename, data: newData })
    assert.notDeepEqual(fileData, fileBase)
    assert.deepEqual(fileData, newData)
  })

  test('update() with merge mode should merge updates into existing data', async ({ assert }) => {
    const initialData = { name: 'John', age: 30 }
    await dataBuddy.create({ path, filename, data: initialData })
    const updates = { age: 31, active: true }
    const fileData = await dataBuddy.update({ path, filename, data: updates, mode: 'merge' })
    assert.deepEqual(fileData, { name: 'John', age: 31, active: true })
  })

  test('update() with merge mode should replace nested objects', async ({ assert }) => {
    const initialData = { user: { name: 'John', profile: { city: 'Paris' } }, status: 'active' }
    await dataBuddy.create({ path, filename, data: initialData })
    const updates = { user: { age: 30 } }
    const fileData = await dataBuddy.update({ path, filename, data: updates, mode: 'merge' })
    assert.deepEqual(fileData, { user: { age: 30 }, status: 'active' })
  })

  test('delete() should delete a file', async ({ assert }) => {
    await dataBuddy.create({ path, filename, data })
    const fileData = await dataBuddy.delete({ path, filename })
    assert.isTrue(fileData)
  })
})

const fileExist = `File ${filename} already exists in tests/${path}`
const fileNotExist = `File ${filename} does not exist in tests/${path}`

test.group('File class (failure)', (group) => {
  group.each.setup(async () => {
    await fs.mkdir('tests/tmp')
  })

  group.each.teardown(async () => {
    await fs.rm('tests/tmp', { recursive: true, force: true })
  })

  test('read() should return null if file does not exist', async ({ assert }) => {
    const fileData = await dataBuddy.read({ path, filename })
    assert.isNull(fileData)
  })

  test('create() should throw an error if file already exists', async ({ assert }) => {
    await dataBuddy.create({ path, filename, data })
    await assert.rejects(async () => {
      await dataBuddy.create({ path, filename, data })
    }, fileExist)
  })

  test('update() should throw an error if file does not exist', async ({ assert }) => {
    await assert.rejects(async () => await dataBuddy.update({ path, filename, data }), fileNotExist)
  })

  test('delete() should return false if file does not exist', async ({ assert }) => {
    const result = await dataBuddy.delete({ path, filename })
    assert.equal(result, false)
  })

  test('isValidJson() should return true for valid JSON file', async ({ assert }) => {
    await dataBuddy.create({ path, filename, data })
    const result = await dataBuddy.isValidJson({ path, filename })
    assert.isTrue(result)
  })

  test('isValidJson() should return false for invalid JSON file', async ({ assert }) => {
    // Create a file with invalid JSON
    const workingPath = dataBuddy['workingPath'](path)
    await fs.writeFile(`${workingPath}/${filename}.json`, '{ invalid json')
    const result = await dataBuddy.isValidJson({ path, filename })
    assert.isFalse(result)
  })

  test('isValidJson() should return false for non-existent file', async ({ assert }) => {
    const result = await dataBuddy.isValidJson({ path, filename })
    assert.isFalse(result)
  })

  test('isValidData() should return true for valid data matching validator', async ({ assert }) => {
    await dataBuddy.create({ path, filename, data })
    const result = await dataBuddy.isValidData({
      path,
      filename,
      validator: (d) =>
        typeof d === 'object' && d !== null && 'test' in (d as Record<string, unknown>),
    })
    assert.isTrue(result)
  })

  test('isValidData() should return false for data not matching validator', async ({ assert }) => {
    await dataBuddy.create({ path, filename, data })
    const result = await dataBuddy.isValidData({
      path,
      filename,
      validator: (d) => typeof d === 'string',
    })
    assert.isFalse(result)
  })

  test('isValidData() should return false for invalid JSON', async ({ assert }) => {
    // Create a file with invalid JSON
    const workingPath = dataBuddy['workingPath'](path)
    await fs.writeFile(`${workingPath}/${filename}.json`, '{ invalid json')
    const result = await dataBuddy.isValidData({ path, filename })
    assert.isFalse(result)
  })
})
