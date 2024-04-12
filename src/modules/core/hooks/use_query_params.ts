import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

export function useQueryParams<T extends string>() {
  const [queryParams, setQueryParams] = useSearchParams()

  const watchQueryParam = useCallback(
    <V extends DefaultValue>(name: T, defaultValue: V): V => {
      const result = queryParams.get(name) ?? (defaultValue as any)

      try {
        return JSON.parse(result) as V
      } catch (e) {
        return result as V
      }
    },
    [queryParams],
  )

  const resetQueryParams = useCallback(() => {
    const newSearchParams = new URLSearchParams()
    setQueryParams(newSearchParams)
  }, [setQueryParams])

  return {
    queryParams,
    setQueryParams,
    watchQueryParam,
    resetQueryParams,
  }
}

type DefaultValue = string | number | boolean
