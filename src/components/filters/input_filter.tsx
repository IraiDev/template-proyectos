import { Input } from ".."
import { SEARCH_PARAMS } from "@configs/constants"
import { InputType } from "@configs/types"
import { twclx } from "@utils/functions"
import { useRef } from "react"
import { useQueryParams } from "@hooks/index"

interface Props<T extends string> {
  name: T
  label?: string
  type?: InputType
  className?: string
  autoFocus?: boolean
  placeholder?: string
  isDisabled?: boolean
  filterOnBlur?: boolean
  sideFilters?: Partial<Record<T, string>>
}

export function InputFilter<T extends string>({
  name,
  label,
  autoFocus,
  className,
  isDisabled,
  sideFilters,
  filterOnBlur,
  type = "text",
  placeholder = "Filtrar...",
}: Props<T>) {
  const { queryParams, setQueryParams, watchQueryParam } = useQueryParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const onFilter = (e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setFilters()
    }
  }

  const handleBlur = () => {
    if (!filterOnBlur) return
    setFilters()
  }

  const handleChange = () => {
    if (type !== "date") return
    setFilters()
  }

  function setFilters() {
    const pageKey = SEARCH_PARAMS.PAGE.KEY
    const value = inputRef.current?.value ?? ""
    const pageDefaultValue = SEARCH_PARAMS.PAGE.DEFAULT_VALUE

    value ? queryParams.set(name, value) : queryParams.delete(name)

    if (queryParams.get(pageKey) && value !== "") {
      queryParams.set(pageKey, pageDefaultValue)
    }

    if (sideFilters) {
      for (const [key, value] of Object.entries(sideFilters)) {
        queryParams.get(key) === null && queryParams.set(key, value as string)
      }
    }

    setQueryParams(queryParams)
  }

  return (
    <div className={twclx("", className)}>
      <Input
        fullWidth
        name={name}
        type={type}
        label={label}
        ref={inputRef}
        autoComplete="off"
        onBlur={handleBlur}
        onKeyDown={onFilter}
        autoFocus={autoFocus}
        isDisabled={isDisabled}
        onChange={handleChange}
        placeholder={placeholder}
        key={watchQueryParam(name, "")}
        defaultValue={watchQueryParam(name, "")}
      />
    </div>
  )
}
