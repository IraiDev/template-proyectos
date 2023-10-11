import { TOKEN_KEY } from "./constants.util"

export function setTokenInLocalStorage(token: string) {
  if (!token) return
  window.localStorage.setItem(TOKEN_KEY, token)
}

export function removeAuthToken() {
  window.localStorage.removeItem(TOKEN_KEY)
}

export function hasToken(): boolean {
  const token = window.localStorage.getItem(TOKEN_KEY)

  return !!token
}
