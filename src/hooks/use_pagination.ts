import { SEARCH_PARAMS } from "@configs/constants"
import { useQueryParams } from "."
import { useCallback } from "react"

const { LIMIT, PAGE } = SEARCH_PARAMS

interface Props {
  total: number
  defaultLimit?: number
}

export function usePagination({
  total,
  defaultLimit = +LIMIT.DEFAULT_VALUE,
}: Props) {
  const { setQueryParams, watchQueryParam } = useQueryParams<"pagina" | "limite">()

  const page = +watchQueryParam("pagina", PAGE.DEFAULT_VALUE)
  const totalPages = Math.ceil(
    (total || 1) / +watchQueryParam("limite", defaultLimit),
  )

  const onChangePage = useCallback(
    (value: number) => {
      const url = new URL(window.location.href)
      url.searchParams.set("pagina", value.toString())

      setQueryParams(url.searchParams)
    },
    [setQueryParams],
  )

  return {
    page,
    totalPages,
    onChangePage,
  }
}
