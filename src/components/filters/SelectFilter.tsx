import { ChangeEvent, useState } from "react"
import { Path } from "react-hook-form"
import { useSearchParams } from "@utils/hooks"
import sp from "@configs/searchParams"

const { page } = sp

interface Props<T extends object> {
  options: { key: string; label: string }[]
  isLoading: boolean
  name: Path<T>
  label: string
  defaultValue?: string
}

export function SelectFilter<T extends object>({
  isLoading,
  name,
  defaultValue,
  options,
}: Props<T>) {
  const { searchParams, setSearchParams, getSearchParam } = useSearchParams()
  const [keys, setKeys] = useState<string[]>([getSearchParam(name, defaultValue).toString()])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const isEmpty = value.length === 0

    isEmpty ? searchParams.delete(name) : searchParams.set(name, value)
    searchParams.set(page.query, page.default)
    setSearchParams(searchParams)
    setKeys([value])
  }
  return (
    <div className="flex justify-center w-full max-w-[130px]">
      <select
        disabled={isLoading}
        name={name}
        className="max-w-[130px]"
        value={keys}
        onChange={handleChange}>
        {options.map(({ key, label }) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
