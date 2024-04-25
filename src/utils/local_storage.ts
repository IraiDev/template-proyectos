import { LocalStorageKeys } from "@config/types"
import { toString } from "./helpers"
import { LOCAL_STORAGE_KEYS as KEYS } from "@config/constants"

type LocalStorageImplements<T = any> = {
  get(props?: { key?: LocalStorageKeys; defaultValue?: T }): T
  save(value: T, key?: LocalStorageKeys): void
  exists(key?: LocalStorageKeys): boolean
  remove(key?: LocalStorageKeys): void
}

const ls = window.localStorage

export class LocalStorage<T> implements LocalStorageImplements<T> {
  constructor(private readonly defaultkey?: LocalStorageKeys) {}

  private generateKey(key?: LocalStorageKeys) {
    const resultKey = key ?? this.defaultkey

    if (key === undefined) {
      throw new Error("undefined key")
    }

    return resultKey as LocalStorageKeys
  }

  get(props?: { key?: LocalStorageKeys; defaultValue?: T }) {
    const key = this.generateKey(props?.key)
    const result = ls.getItem(KEYS[key]) ?? toString(props?.defaultValue ?? "")

    try {
      return JSON.parse(result) as T
    } catch (e) {
      return result as T
    }
  }

  save(value: T, key?: LocalStorageKeys): void {
    if (value) {
      ls.setItem(KEYS[this.generateKey(key)], toString(value))
    }
  }

  remove(key?: LocalStorageKeys): void {
    ls.removeItem(KEYS[this.generateKey(key)])
  }

  exists(key?: LocalStorageKeys): boolean {
    const token = ls.getItem(KEYS[this.generateKey(key)])

    return Boolean(token)
  }
}
