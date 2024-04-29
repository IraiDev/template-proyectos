import { twclx } from "@utils/index"
import { ChangeEvent } from "react"
import { Option } from "@config/interfaces"
import { useQueryParams } from "@modules/core/hooks"
import { SEARCH_PARAMS } from "@config/constants"
import Select from "../form/select"

type Props<T extends string> = {
  name: T
  label: string
  options?: Option[]
  className?: string
  isDisabled: boolean
  defaultValue?: string
  sideFilters?: Partial<Record<T, string>>
}

export function SelectFilter<T extends string>({
  name,
  label,
  className,
  isDisabled,
  sideFilters,
  options = [],
  defaultValue = "",
}: Props<T>) {
  const { queryParams, setQueryParams, watchQueryParam } = useQueryParams()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const key = SEARCH_PARAMS.PAGE.KEY
    const defaultValue = SEARCH_PARAMS.PAGE.DEFAULT_VALUE

    value ? queryParams.set(name, value) : queryParams.delete(name)

    if (sideFilters) {
      for (const [key, value] of Object.entries(sideFilters)) {
        queryParams.get(key) === null && queryParams.set(key, value as string)
      }
    }

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
