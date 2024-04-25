import { NEXT_UI_DEFAULT_STYLES_PROPS } from "@config/constants"
import { FieldProps } from "@config/interfaces"
import { SpecialFieldEventHandler } from "@config/types"
import {
  DateRangePickerProps,
  DateRangePicker as NextDateRangePicker,
} from "@nextui-org/react"
import { KeyboardEventHandler } from "react"

type Props = {
  isPreventDefaultEnter: boolean
  ref: React.RefObject<HTMLInputElement>
} & ExtendsProps

export function DateRangePicker({
  ref,
  hidden,
  onSideEffect,
  isPreventDefaultEnter,
  ...props
}: Partial<Props>) {
  const handleKeyDown: KeyboardEvent = (e) => {
    if (isPreventDefaultEnter && e.key === "Enter") {
      e.preventDefault()
    }
    props.onKeyDown?.(e as any)
  }

  const handleChange: SpecialFieldEventHandler = (onChange) => (date) => {
    onChange?.(date) ?? props.onChange?.(date)
    onSideEffect?.(date.toString())
  }

  if (hidden) return null

  return (
    <NextDateRangePicker
      ref={ref}
      {...defaultProps}
      onChange={handleChange()}
      onKeyDown={handleKeyDown}
      {...props}
    />
  )
}

type ExtendsProps = DateRangePickerProps & FieldProps
type KeyboardEvent = KeyboardEventHandler<HTMLInputElement>

const defaultProps: DateRangePickerProps = {
  placeholder: " ",
  ...NEXT_UI_DEFAULT_STYLES_PROPS,
}
