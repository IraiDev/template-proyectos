import { NEXT_UI_DEFAULT_STYLES_PROPS } from "@config/constants"
import { FieldProps } from "@config/interfaces"
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
  isPreventDefaultEnter,
  ...props
}: Partial<Props>) {
  const handleKeyDown: KeyboardEvent = (e) => {
    if (isPreventDefaultEnter && e.key === "Enter") {
      e.preventDefault()
    }
    props.onKeyDown?.(e as any)
  }

  if (hidden) return null

  return (
    <NextDateRangePicker ref={ref} {...defaultProps} onKeyDown={handleKeyDown} {...props} />
  )
}

type ExtendsProps = DateRangePickerProps & FieldProps
type KeyboardEvent = KeyboardEventHandler<HTMLInputElement>

const defaultProps: DateRangePickerProps = {
  ...NEXT_UI_DEFAULT_STYLES_PROPS,
}
