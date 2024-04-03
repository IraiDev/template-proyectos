import { MyInput } from ".."
import { SEARCH_PARAMS } from "@configs/constants"
import { InputType } from "@configs/types"
import { twclx } from "@utils/functions"
import { useQueryParams } from "@utils/hooks"
import { useRef } from "react"

interface Props<T extends string> {
  name: T
  label?: string
  type?: InputType
  className?: string
  autoFocus?: boolean
  placeholder?: string
  isDisabled?: boolean
  isOnBlurDisabled?: boolean
}

export function InputFilter<T extends string>({
  name,
  label,
  autoFocus,
  className,
  isDisabled,
  type = "text",
  isOnBlurDisabled,
  placeholder = "Filtrar...",
}: Props<T>) {
  const { params, setParams, getParam } = useQueryParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFilter = (
    e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setFilters()
    }
  }

  const handleBlur = () => {
    if (isOnBlurDisabled) return
    setFilters()
  }

  const handleDateChange = () => {
    if (type !== "date") return
    setFilters()
  }

  function setFilters() {
    const value = inputRef.current?.value ?? ""
    const key = SEARCH_PARAMS.PAGE.KEY
    const defaultValue = SEARCH_PARAMS.PAGE.DEFAULT_VALUE

    value ? params.set(name, value) : params.delete(name)

    if (params.get(key) && value !== "") {
      params.set(key, defaultValue)
    }

    setParams(params)
  }

  return (
    <div className={twclx("pl-1.5 pb-1.5", className)}>
      <MyInput
        size="sm"
        fullWidth
        radius="sm"
        name={name}
        type={type}
        label={label}
        ref={inputRef}
        onBlur={handleBlur}
        autoCapitalize="off"
        autoFocus={autoFocus}
        isDisabled={isDisabled}
        onKeyDown={handleFilter}
        key={getParam(name, "")}
        placeholder={placeholder}
        onChange={handleDateChange}
        defaultValue={getParam(name, "")}
      />
    </div>
  )
}
