import { MyInput } from "@components/form"
import sp from "@configs/searchParams"
import { IconFilterSearch } from "@tabler/icons-react"
import { useSearchParams } from "@utils/hooks"
import { FocusEvent, FormEvent } from "react"

const { page } = sp

interface Props {
  name: string
  label: string
  className?: string
  isLoading?: boolean
}

export function InputFilter({ label, name, className = "max-w-xs w-full", isLoading }: Props) {
  const { searchParams, setSearchParams, getSearchParam } = useSearchParams()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const { [name]: input } = e.target as HTMLFormElement
    const isEmpty = !input.value

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
      <MyInput
        size="sm"
        name={name}
        label={label}
        className="w-full"
        autoCapitalize="off"
        isDisabled={isLoading}
        labelPlacement="inside"
        placeholder="filtrar..."
        onBlur={handleFilterOnBlur}
        endContent={<IconFilterSearch size={15} />}
        defaultValue={getSearchParam(name, "").toString()}
      />
      <input hidden type="submit" />
    </form>
  )
}
