import { DataBuddy } from '../src/data_buddy.js'
import { test } from '@japa/runner'
import * as fs from 'node:fs/promises'

test.group('DataBuddy', (group) => {
  const dataBuddy = new DataBuddy()
  const path = 'tests/tmp'
  const filename = 'test'
  const data = { test: 'test' }

  group.each.setup(async () => {
    await fs.mkdir('tests/tmp')
  })

  group.each.teardown(async () => {
    await fs.rm('tests/tmp', { recursive: true, force: true })
  })

  test('read', async ({ assert }) => {
    await dataBuddy.create({ path, filename, data })
    const fileData = await dataBuddy.read({ path, filename })
    assert.deepEqual(fileData, data)
  })

  test('create', async ({ assert }) => {
    const fileData = await dataBuddy.create({ path, filename, data })
    assert.deepEqual(fileData, data)
  })

  test('update', async ({ assert }) => {
    const fileBase = await dataBuddy.create({ path, filename, data })
    const newData = { test: 'new test' }
    const fileData = await dataBuddy.update({ path, filename, data: newData })
    assert.notDeepEqual(fileData, fileBase)
    assert.deepEqual(fileData, newData)
  })

  test('delete', async ({ assert }) => {
    await dataBuddy.create({ path, filename, data })
    const fileData = await dataBuddy.delete({ path, filename })
    assert.isTrue(fileData)
  })
})
