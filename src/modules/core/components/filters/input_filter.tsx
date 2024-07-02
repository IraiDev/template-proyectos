import { InputType } from "@config/types"
import { twclx } from "@helpers/tailwind"
import { useCallback, useRef } from "react"
import { SEARCH_PARAMS } from "@config/constants"
import Input from "../form/input"
import { useQueryParams } from "@modules/core/hooks/use_query_params"

type Props<T extends string> = {
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

const InputFilter = <T extends string>({
  name,
  label,
  autoFocus,
  className,
  isDisabled,
  sideFilters,
  filterOnBlur,
  type = "text",
  placeholder = "Filtrar...",
}: Props<T>) => {
  const { queryParams, setQueryParams, watchQueryParam } = useQueryParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const onFilter = (
    e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent,
  ) => {
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

  const setFilters = useCallback(
    function () {
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
    },
    [queryParams, setQueryParams, name, sideFilters],
  )

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

export default InputFilter
