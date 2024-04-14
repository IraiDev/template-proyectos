import { TOKEN_KEY } from "@config/constants"
import { getErrorMessage, logError } from "./errors"

type RequestOptions = {
  withToken?: boolean
  fileName: string
} & RequestInit

export function fetcher(baseUrl: string) {
  return (endpoint: string, requestOptions: RequestOptions) => {
    try {
      const adaptedEndpoint = endpoint.at(0) === "/" ? endpoint : `/${endpoint}`
      const headers = new Headers(requestOptions?.headers)

      if (requestOptions.withToken) {
        headers.append("x-token", TOKEN_KEY)
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
