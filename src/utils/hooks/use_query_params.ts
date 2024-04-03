import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

type Value = string | number | boolean

export function useQueryParams<T extends string>() {
  const [params, setParams] = useSearchParams()

  const getParam = useCallback(
    <V extends Value = string>(name: T, defaultValue?: V): V => {
      if (typeof defaultValue === "boolean") {
        return (params.get(name) === "true" ?? defaultValue) as V
      }
      if (typeof defaultValue === "number") {
        return +(params.get(name) || defaultValue) as V
      }
      return (params.get(name) || defaultValue) as V
    },
    [params],
  )

  const resetFilters = () => {
    const newSearchParams = new URLSearchParams()
    setParams(newSearchParams)
  }

  return {
    params,
    getParam,
    setParams,
    resetFilters,
  }
}
