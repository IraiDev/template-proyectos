import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import searchParams from "@configs/searchParams"

const { limit, page: pageQuery } = searchParams

export function usePagination({ total }: { total: number }) {
  const [page, setPage] = useState(Number(pageQuery.default))
  const [searchParam, setSearchParam] = useSearchParams()

  const totalPages = Math.ceil((total || 1) / Number(searchParam.get(limit.query) ?? limit.default))

  const onChangePage = (value: number) => {
    setPage(value)
    searchParam.set(pageQuery.query, value.toString())
    setSearchParam(searchParam)
  }

  const onPrevious = () => {
    if (page === 1) return
    const newPage = page - 1
    setPage(newPage)
    searchParam.set(pageQuery.query, newPage.toString())
    setSearchParam(searchParam)
  }

  const onNext = () => {
    if (page === totalPages) return
    const newPage = page + 1
    setPage(newPage)
    searchParam.set(pageQuery.query, newPage.toString())
    setSearchParam(searchParam)
  }

  useEffect(() => {
    setPage(Number(searchParam.get(pageQuery.query) ?? 1))
  }, [searchParam])

  return {
    totalPages,
    page,
    onNext,
    onPrevious,
    onChangePage,
  }
}
