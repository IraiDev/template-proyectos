import { useEffect, useState } from "react"
import { useSearchParams } from "."
import searchParams from "@configs/searchParams"

const { limit, page: pageQuery } = searchParams

interface Props {
  total: number
  isLoading?: boolean
}

export function usePagination({ total }: Props) {
  const [page, setPage] = useState(+pageQuery.default)
  const { searchParams, setSearchParams, getSearchParam } = useSearchParams<"pagina" | "limite">()

  useEffect(() => {
    setPage(+getSearchParam("pagina", pageQuery.default))
  }, [getSearchParam])

  const totalPages = Math.ceil((total || 1) / +getSearchParam("limite", limit.default))

  const onChangePage = (value: number) => {
    setPage(value)
    searchParams.set(pageQuery.query, value.toString())
    setSearchParams(searchParams)
  }

  const onPrevious = () => {
    if (page === 1) return

    const newPage = page - 1
    setPage(newPage)
    searchParams.set(pageQuery.query, newPage.toString())
    setSearchParams(searchParams)
  }

  const onNext = () => {
    if (page === totalPages) return

    const newPage = page + 1
    setPage(newPage)
    searchParams.set(pageQuery.query, newPage.toString())
    setSearchParams(searchParams)
  }

  return {
    totalPages,
    page,
    onNext,
    onPrevious,
    onChangePage,
  }
}
