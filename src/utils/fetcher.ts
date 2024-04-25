import { TIPO, VERSION_WEB } from "@config/constants"
import { getErrorMessage, logError } from "./errors"
import { getFromLocalStorage } from "./local_storage"

type RequestOptions = {
  withToken?: boolean
  fileName: string
} & RequestInit

export function fetcher(baseUrl: string) {
  return (endpoint: string, requestOptions: RequestOptions) => {
    try {
      const adaptedEndpoint = endpoint.at(0) === "/" ? endpoint : `/${endpoint}`
      const headers = new Headers(requestOptions?.headers)

      headers.append("tipo", TIPO)
      headers.append("version", VERSION_WEB)

      if (requestOptions.withToken) {
        const token = getFromLocalStorage("TOKEN_KEY")
        headers.append("x-token", token)
      }

      return fetch(`${baseUrl}${adaptedEndpoint}`, {
        ...requestOptions,
        headers,
      })
    } catch (e) {
      logError(e, requestOptions.fileName)
      const errorMessage = getErrorMessage(e)
      throw new Error(errorMessage)
    }
  }
}
