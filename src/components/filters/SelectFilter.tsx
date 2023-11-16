import { ChangeEvent, useState } from "react"
import { Path } from "react-hook-form"
import { useSearchParams } from "@utils/hooks"
import { Select } from "@components/form"
import sp from "@configs/searchParams"

const { page } = sp

interface Props<T extends object> {
  options: Option[]
  isLoading: boolean
  name: Path<T>
  label: string
  defaultValue?: string
  className?: string
}

export function SelectFilter<T extends object>({
  name,
  label,
  options,
  isLoading,
  className = "w-full max-w-[130px]",
  defaultValue,
}: Props<T>) {
  const { searchParams, setSearchParams, getSearchParam } = useSearchParams()
  const [key, setKey] = useState<string>(getSearchParam(name, defaultValue).toString())

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const isEmpty = value.length === 0

    isEmpty ? searchParams.delete(name) : searchParams.set(name, value)
    searchParams.set(page.query, page.default)
    setSearchParams(searchParams)
    setKey(value)
  }
  return (
    <div className={className}>
      <Select
        size="sm"
        value={key}
        name={name}
        label={label}
        options={options}
        disabled={isLoading}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  )
}
