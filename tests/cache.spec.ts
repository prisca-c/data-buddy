import { Cache } from '../src/cache.js'
import { test } from '@japa/runner'

const cache = new Cache()
const key = 'test'
const value = { test: 'test' }

test.group('Cache class', (group) => {
  group.each.teardown(() => {
    cache.clear()
  })

  test('get() should return undefined if key does not exist', async ({ assert }) => {
    const cacheValue = cache.get(key)
    assert.isUndefined(cacheValue)
  })

  test('get() should return the value if key exists', async ({ assert }) => {
    cache.set(key, value)
    const cacheValue = cache.get(key)
    assert.deepEqual(cacheValue, value)
  })

  test('set() should set a key-value pair', async ({ assert }) => {
    cache.set(key, value)
    const cacheValue = cache.get(key)
    assert.deepEqual(cacheValue, value)
  })

  test('set() should set a key-value pair with a ttl and delete it after the ttl', async ({
    assert,
  }) => {
    cache.set(key, value, 100)
    assert.isTrue(cache.has(key))
    setTimeout(() => {
      assert.isFalse(cache.has(key))
    }, 101)
  })

  test('delete() should delete a key-value pair', async ({ assert }) => {
    cache.set(key, value)
    const cacheValue = cache.delete(key)
    assert.isTrue(cacheValue)
  })

  test('delete() should return false if key does not exist', async ({ assert }) => {
    const cacheValue = cache.delete(key)
    assert.isFalse(cacheValue)
  })

  test('clear() should clear the cache', async ({ assert }) => {
    cache.set(key, value)
    cache.clear()
    const cacheValue = cache.get(key)
    assert.isUndefined(cacheValue)
  })

  test('has() should return true if key exists', async ({ assert }) => {
    cache.set(key, value)
    const cacheValue = cache.has(key)
    assert.isTrue(cacheValue)
  })

  test('has() should return false if key does not exist', async ({ assert }) => {
    const cacheValue = cache.has(key)
    assert.isFalse(cacheValue)
  })

  test('all() should return all the keys', async ({ assert }) => {
    cache.set(key, value)
    const keys = cache.all()
    assert.deepEqual(keys, [[key, value]])
  })

  test('all() should return empty array if cache is empty', async ({ assert }) => {
    const keys = cache.all()
    assert.deepEqual(keys, [])
  })
})
