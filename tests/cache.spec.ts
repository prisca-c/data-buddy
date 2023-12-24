import { Cache } from '../src/cache.js'
import { test } from '@japa/runner'

const cache = new Cache()
const key = 'test'
const value = { value: 'test' }

test.group('Cache class - Success', (group) => {
  group.each.teardown(() => {
    cache.clear()
  })

  test('get() should return the value if key exists', async ({ assert }) => {
    await cache.set(key, value)
    const cacheValue = await cache.get(key)
    assert.deepEqual(cacheValue, value)
  })

  test('set() should set a key-value pair', async ({ assert }) => {
    await cache.set(key, value)
    const cacheValue = await cache.get(key)
    assert.deepEqual(cacheValue, value)
  })

  test('delete() should delete a key-value pair', async ({ assert }) => {
    await cache.set(key, value)
    const cacheValue = cache.delete(key)
    assert.isTrue(cacheValue)
  })

  test('has() should return true if key exists', async ({ assert }) => {
    await cache.set(key, value)
    const cacheValue = cache.has(key)
    assert.isTrue(cacheValue)
  })

  test('all() should return all the keys', async ({ assert }) => {
    await cache.set(key, value)
    const keys = cache.all()
    assert.deepEqual(keys, [[key, value]])
  })
})

test.group('Cache class - Failure', (group) => {
  group.each.teardown(() => {
    cache.clear()
  })

  test('get() should return undefined if key does not exist', async ({ assert }) => {
    const cacheValue = await cache.get(key)
    assert.isUndefined(cacheValue)
  })

  test('delete() should return false if key does not exist', async ({ assert }) => {
    const cacheValue = cache.delete(key)
    assert.isFalse(cacheValue)
  })

  test('has() should return false if key does not exist', async ({ assert }) => {
    const cacheValue = cache.has(key)
    assert.isFalse(cacheValue)
  })

  test('all() should return empty array if cache is empty', async ({ assert }) => {
    const keys = cache.all()
    assert.deepEqual(keys, [])
  })
})
