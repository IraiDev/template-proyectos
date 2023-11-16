import { ChangeEvent, useState } from "react"
import { Path } from "react-hook-form"
import { useSearchParams } from "@utils/hooks"
import sp from "@configs/searchParams"

const { page } = sp

interface Props<T extends object> {
  name: Path<T>
  label?: string
  options: Option[]
  isLoading: boolean
  className?: string
  defaultValue?: string
}

export function SelectFilter<T extends object>({
  name,
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
      <select
        value={key}
        name={name}
        disabled={isLoading}
        onChange={handleChange}
        className="w-full">
        {options.map(({ key, label }) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
