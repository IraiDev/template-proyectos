import { SEARCH_PARAMS } from "@config/constants"
import { useCallback } from "react"
import { useQueryParams } from "./use_query_params"

const { LIMIT, PAGE } = SEARCH_PARAMS

interface Props {
  total: number
  defaultLimit?: number
  onChangePage?(page: number): void
}

export function usePagination({
  total,
  onChangePage,
  defaultLimit = +LIMIT.DEFAULT_VALUE,
}: Props) {
  const { setQueryParams, watchQueryParam } = useQueryParams<
    "pagina" | "limite"
  >()

  const page = +watchQueryParam("pagina", PAGE.DEFAULT_VALUE)
  const totalPages = Math.ceil(
    (total || 1) / +watchQueryParam("limite", defaultLimit),
  )

  const handleChangePage = useCallback(
    (value: number) => {
      const url = new URL(window.location.href)
      url.searchParams.set("pagina", value.toString())

      setQueryParams(url.searchParams)
      onChangePage?.(value)
    },
    [setQueryParams, onChangePage],
  )

  return {
    page,
    totalPages,
    onChangePage: handleChangePage,
  }
}
