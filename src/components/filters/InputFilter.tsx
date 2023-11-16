import { FocusEvent, FormEvent } from "react"
import { useSearchParams } from "@utils/hooks"
import sp from "@configs/searchParams"

const { page } = sp

interface Props {
  name: string
  label?: string
  className?: string
  isLoading?: boolean
}

export function InputFilter({ name, className = "max-w-xs w-full" }: Props) {
  const { searchParams, setSearchParams, getSearchParam } = useSearchParams()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { [name]: input } = e.target as HTMLFormElement
    const isEmpty = input.value.length === 0

    isEmpty ? searchParams.delete(input.name) : searchParams.set(input.name, input.value)
    searchParams.set(page.query, page.default)

    setSearchParams(searchParams)
  }

  const handleFilterOnBlur = (e: FocusEvent<any>) => {
    const value = e.target.value
    const name = e.target.name

    if (!value) {
      searchParams.delete(name)
    } else {
      searchParams.set(name, value)
    }

    if (searchParams.get(page.query) && value !== "") {
      searchParams.set(page.query, page.default)
    }
    setSearchParams(searchParams)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        name={name}
        className="w-full"
        autoCapitalize="off"
        placeholder="filtrar..."
        defaultValue={getSearchParam(name, "").toString()}
        onBlur={handleFilterOnBlur}
      />
      <input hidden type="submit" />
    </form>
  )
}
