import { SEARCH_PARAMS } from "@configs/constants"
import { twclx } from "@utils/functions"
import { useQueryParams } from "@utils/hooks"
import { ChangeEvent } from "react"
import { MySelect } from ".."
import { Option } from "@configs/interfaces"

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
  const { params, setParams, getParam } = useQueryParams()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const key = SEARCH_PARAMS.PAGE.KEY
    const defaultValue = SEARCH_PARAMS.PAGE.DEFAULT_VALUE

    value ? params.set(name, value) : params.delete(name)

    if (params.get(key) && value !== "") {
      params.set(key, defaultValue)
    }

    setParams(params)
  }

  return (
    <div className={twclx("w-full max-w-[130px]", className)}>
      <MySelect
        size="sm"
        fullWidth
        name={name}
        radius="sm"
        label={label}
        options={options}
        isDisabled={isDisabled}
        onChange={handleChange}
        value={getParam(name, defaultValue)}
        defaultValue={getParam(name, defaultValue)}
      />
    </div>
  )
}
