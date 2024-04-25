import { LocalStorageKeys } from "@config/types"
import { toString } from "./helpers"
import { LOCAL_STORAGE_KEYS } from "@config/constants"

export function saveInLocalStorage(key: LocalStorageKeys, value: any) {
  if (value) {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS[key], toString(value))
  }
}

export function removeFromLocalStorage(key: LocalStorageKeys) {
  window.localStorage.removeItem(LOCAL_STORAGE_KEYS[key])
}

export function getFromLocalStorage<T = any>(
  key: LocalStorageKeys,
  defaultValue?: T,
) {
  const result =
    window.localStorage.getItem(LOCAL_STORAGE_KEYS[key]) ??
    toString(defaultValue ?? "")

  try {
    return JSON.parse(result) as T
  } catch (e) {
    return result as T
  }
}

export function isInLocalStorage(key: LocalStorageKeys): boolean {
  const token = window.localStorage.getItem(LOCAL_STORAGE_KEYS[key])

  return Boolean(token)
}
