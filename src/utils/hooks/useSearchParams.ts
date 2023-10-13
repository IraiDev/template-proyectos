import { useCallback } from "react"
import { useSearchParams as useSearch } from "react-router-dom"

export function useSearchParams<T extends string>() {
  const [searchParams, setSearchParams] = useSearch()

  const getSearchParam = useCallback(
    (name: T, defaultValue: number | string | boolean = "") => {
      return searchParams.get(name) ?? defaultValue
    },
    [searchParams],
  )

  return {
    searchParams,
    getSearchParam,
    setSearchParams,
  }
}
