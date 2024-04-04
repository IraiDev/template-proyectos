import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

export function useQueryParams<T extends string>() {
  const [queryParams, setQueryParams] = useSearchParams()

  const watchSearchParam: WatchSeaarchParamHandler<T, DefaultValue> = useCallback(
    (name, defaultValue) => {
      const result = queryParams.get(name)

      try {
        return JSON.parse(result ?? (defaultValue as string))
      } catch (e) {
        return result ?? defaultValue
      }
    },
    [queryParams],
  )

  const resetSearchParams = useCallback(() => {
    const newSearchParams = new URLSearchParams()
    setQueryParams(newSearchParams)
  }, [setQueryParams])

  return {
    queryParams,
    setQueryParams,
    watchSearchParam,
    resetSearchParams,
  }
}

type DefaultValue = string | number | boolean

type WatchSeaarchParamHandler<T extends string, V extends DefaultValue> = (
  name: T,
  defaultValue: V,
) => DefaultValue
