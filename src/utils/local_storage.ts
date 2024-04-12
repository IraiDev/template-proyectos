import { LocalStorageKeys } from "@config/types"
import { toString } from "./utils"

export function saveInLocalStorage(key: LocalStorageKeys, value: any) {
  if (value) {
    window.localStorage.setItem(key, toString(value))
  }
}

export function removeFromLocalStorage(key: LocalStorageKeys) {
  window.localStorage.removeItem(key)
}

export function getFromLocalStorage(key: LocalStorageKeys) {
  const result = window.localStorage.getItem(key) ?? ""

  try {
    return JSON.parse(result)
  } catch (e) {
    return result
  }
}

export function isInLocalStorage(key: LocalStorageKeys): boolean {
  const token = window.localStorage.getItem(key)

  return Boolean(token)
}
