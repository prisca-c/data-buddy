export interface KeyValuePairInterface<T = unknown> {
  key: string
  value: T
  expiry?: number
}
