import axios, { AxiosHeaders } from "axios"
import { API_BASE_URL, TOKEN_KEY, CONSTANTS } from "@utils/constants.util"

const HEADER_TOKEN_KEY = "x-token"

const api = axios.create({
  baseURL: API_BASE_URL,
})

const setAuthToken = (token: string | null) => {
  const headers = new AxiosHeaders()

  if (token) {
    headers.set(HEADER_TOKEN_KEY, token)
  } else {
    headers.delete(HEADER_TOKEN_KEY)
  }

  return headers
}

api.interceptors.request.use((config) => {
  const tokenIsRequired = config.headers[CONSTANTS.TOKEN_REQUIRED] || false
  const token = window.localStorage.getItem(TOKEN_KEY)

  if (tokenIsRequired) {
    const headers = setAuthToken(token)
    return { ...config, headers }
  }

  return config
})
