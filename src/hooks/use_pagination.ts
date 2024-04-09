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
  const { setParams, getParam } = useQueryParams<"pagina" | "limite">()

  const page = +getParam("pagina", PAGE.DEFAULT_VALUE)
  const totalPages = Math.ceil((total || 1) / +getParam("limite", defaultLimit))

  const onChangePage = useCallback(
    (value: number) => {
      setParams(() => {
        const url = new URL(window.location.href)
        url.searchParams.set("pagina", value.toString())
        return url.searchParams
      })
    },
    [setParams],
  )

  return {
    page,
    totalPages,
    onChangePage,
  }
}
