import axios from "axios"
import { API_BASE_URL, TOKEN_KEY, CONSTANT } from "@utils/contants.util"

const HEADER_TOKEN_KEY = "x-token"

const apiCegepal = axios.create({
  baseURL: API_BASE_URL,
})

const setAuthToken = (token: string | null) => {
  if (token) {
    apiCegepal.defaults.headers.common[HEADER_TOKEN_KEY] = token
  } else {
    delete apiCegepal.defaults.headers.common[HEADER_TOKEN_KEY]
  }
}

apiCegepal.interceptors.request.use((config) => {
  const tokenIsRequired = config.headers[CONSTANT.TOKEN_REQUIRED]
  const token = window.localStorage.getItem(TOKEN_KEY)

  if (tokenIsRequired) {
    setAuthToken(token)
  }

  return config
})

export default apiCegepal
