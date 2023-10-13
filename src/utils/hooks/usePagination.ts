import { useEffect, useState } from "react"
import { useSearchParams } from "."
import searchParams from "@configs/searchParams"

const { limit, page: pageQuery } = searchParams

interface Props {
  total: number
  isLoading?: boolean
}

export function usePagination({ total, isLoading }: Props) {
  const [page, setPage] = useState(+pageQuery.default)
  const { searchParams, setSearchParams, getSearchParam } = useSearchParams<"pagina">()

  useEffect(() => {
    setPage(+getSearchParam("pagina", "1"))
  }, [getSearchParam])

  const totalPages = Math.ceil((total || 1) / +getSearchParam("pagina", limit.default))

  const onChangePage = (value: number) => {
    if (isLoading) return

    setPage(value)
    searchParams.set(pageQuery.query, value.toString())
    setSearchParams(searchParams)
  }

  const onPrevious = () => {
    if (page === 1 || isLoading) return

    const newPage = page - 1
    setPage(newPage)
    searchParams.set(pageQuery.query, newPage.toString())
    setSearchParams(searchParams)
  }

  const onNext = () => {
    if (page === totalPages || isLoading) return

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
