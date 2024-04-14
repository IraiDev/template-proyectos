import { TOKEN_KEY } from "@config/constants"

export function fetcher(baseUrl: string) {
  return (endpoint: string, requestOptions?: RequestOptions) => {
    const adaptedEndpoint = endpoint.at(0) === "/" ? endpoint : `/${endpoint}`

    const headers = new Headers(requestOptions?.headers)

    if (requestOptions?.withToken) {
      headers.append("x-token", TOKEN_KEY)
    }

    return fetch(`${baseUrl}${adaptedEndpoint}`, {
      ...requestOptions,
      headers,
    })
  }
}

type RequestOptions = {
  withToken: boolean
} & RequestInit
