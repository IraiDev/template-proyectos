import { SEARCH_PARAMS } from "@configs/constants"
import { twclx } from "@utils/functions"
import { ChangeEvent } from "react"
import { Select } from ".."
import { Option } from "@configs/interfaces"
import { useQueryParams } from "@hooks/index"

interface Props<T extends string> {
  name: T
  label: string
  options?: Option[]
  className?: string
  isDisabled: boolean
  defaultValue?: string
}

export function SelectFilter<T extends string>({
  name,
  label,
  className,
  isDisabled,
  options = [],
  defaultValue = "",
}: Props<T>) {
  const { queryParams, setQueryParams, watchQueryParam } = useQueryParams()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const key = SEARCH_PARAMS.PAGE.KEY
    const defaultValue = SEARCH_PARAMS.PAGE.DEFAULT_VALUE

    value ? queryParams.set(name, value) : queryParams.delete(name)

    if (queryParams.get(key) && value !== "") {
      queryParams.set(key, defaultValue)
    }

    setQueryParams(queryParams)
  }

  return (
    <div className={twclx("w-full max-w-[130px]", className)}>
      <Select
        fullWidth
        name={name}
        label={label}
        options={options}
        isDisabled={isDisabled}
        onChange={handleChange}
        value={watchQueryParam(name, defaultValue)}
        defaultValue={watchQueryParam(name, defaultValue)}
      />
    </div>
  )
}
