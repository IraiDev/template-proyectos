import { LocalStorageKeys } from "@config/types"
import { toString } from "./utils"
import { LOCAL_STORAGE_KEYS } from "@config/constants"

export function saveInLocalStorage(key: LocalStorageKeys, value: any) {
  if (value) {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS[key], toString(value))
  }
}

export function removeFromLocalStorage(key: LocalStorageKeys) {
  window.localStorage.removeItem(LOCAL_STORAGE_KEYS[key])
}

export function getFromLocalStorage(key: LocalStorageKeys) {
  const result = window.localStorage.getItem(LOCAL_STORAGE_KEYS[key]) ?? ""

  try {
    return JSON.parse(result)
  } catch (e) {
    return result
  }
}

export function isInLocalStorage(key: LocalStorageKeys): boolean {
  const token = window.localStorage.getItem(LOCAL_STORAGE_KEYS[key])

  return Boolean(token)
}
