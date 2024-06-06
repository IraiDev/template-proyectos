import { getErrorMessage, logError } from "./errors"
import { LocalStorage } from "./local_storage"

type RequestOptions = {
  withToken?: boolean
  fileName: string
} & RequestInit

export function fetcher(baseUrl: string) {
  return (endpoint: string, requestOptions: RequestOptions) => {
    try {
      const adaptedEndpoint = endpoint.at(0) === "/" ? endpoint : `/${endpoint}`
      const headers = new Headers(requestOptions?.headers)
      const token = new LocalStorage<string>("TOKEN_KEY")

      if (requestOptions.withToken) {
        headers.append("x-token", token.get())
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
