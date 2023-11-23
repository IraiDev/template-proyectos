import { useCallback } from "react"
import { useNavigate, useSearchParams as useSearch } from "react-router-dom"

type Primitives = string | number | boolean

export function useSearchParams<T extends string>() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearch()

  const getSearchParam = useCallback(
    <R extends Primitives = string>(name: T, defaultValue: R): R => {
      if (typeof defaultValue === "boolean") {
        return (searchParams.get(name) === "true" ?? defaultValue) as R
      }
      return (searchParams.get(name) || defaultValue) as R
    },
    [searchParams],
  )

  const handleNavigateWithSearchparams =
    <T extends object>(to: string, entry: T) =>
    () => {
      for (const [key, value] of Object.entries(entry)) {
        searchParams.set(key, value)
      }
      navigate(`${to}?${searchParams.toString()}`)
    }

  return {
    searchParams,
    getSearchParam,
    setSearchParams,
    handleNavigateWithSearchparams,
  }
}
