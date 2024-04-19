import { NEXT_UI_DEFAULT_STYLES_PROPS } from "@config/constants"
import { FieldProps } from "@config/interfaces"
import { SpecialFieldEventHandler } from "@config/types"
import { TimeInputProps, TimeInput as NextTimeInput } from "@nextui-org/react"
import { KeyboardEventHandler } from "react"
import { Control, Controller, Path } from "react-hook-form"

type Props<T extends object> = {
  control: Control<T>
  name: Path<T> | string
  isPreventDefaultEnter: boolean
  ref: React.RefObject<HTMLInputElement>
} & ExtendsProps

export function TimeInput<T extends object>({
  ref,
  name,
  hidden,
  control,
  onSideEffect,
  isPreventDefaultEnter,
  ...props
}: Partial<Props<T>>) {
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

  if (control) {
    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field: { onChange, value, ...field }, fieldState }) => (
          <>
            <NextTimeInput
              {...defaultProps}
              {...props}
              {...field}
              onKeyDown={handleKeyDown}
              onChange={handleChange(onChange)}
              errorMessage={fieldState.error?.message}
              value={value}
            />
          </>
        )}
      />
    )
  }
  return (
    <NextTimeInput
      ref={ref}
      name={name}
      {...defaultProps}
      onChange={handleChange()}
      onKeyDown={handleKeyDown}
      {...props}
    />
  )
}

type ExtendsProps = TimeInputProps & FieldProps
type KeyboardEvent = KeyboardEventHandler<HTMLInputElement>

const defaultProps: TimeInputProps = {
  placeholder: " ",
  ...NEXT_UI_DEFAULT_STYLES_PROPS,
}
