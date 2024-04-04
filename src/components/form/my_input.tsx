import { FieldProps } from "@configs/interfaces"
import { InputOnlyNumberEntryType } from "@configs/types"
import { Input, InputProps, SlotsToClasses } from "@nextui-org/react"
import { inputOnlyNumber } from "@utils/functions"
import { KeyboardEventHandler } from "react"
import { Control, Controller, Path } from "react-hook-form"

type ClassNames = SlotsToClasses<
  | "description"
  | "errorMessage"
  | "label"
  | "base"
  | "mainWrapper"
  | "inputWrapper"
  | "innerWrapper"
  | "input"
  | "clearButton"
  | "helperWrapper"
>

const defaultInputProps = (classNames?: ClassNames): InputProps => ({
  size: "sm",
  radius: "sm",
  variant: "flat",
  placeholder: " ",
  labelPlacement: "outside",
  classNames: {
    innerWrapper: "mb-0 pb-0",
    input: "!text-opacity-70 placeholder:!text-opacity-50",
    label: "first-letter:uppercase font-semibold !text-default-950",
    inputWrapper:
      "!ring-transparent border border-default focus-within:border-primary bg-default-100 hover:bg-default-200 !shadow-none transition-colors",
    ...classNames,
  },
})

type Props<T extends object> = {
  control: Control<T>
  onlyNumber: boolean
  name: Path<T> | string
  isEnterPreventDefault: boolean
  entryType: InputOnlyNumberEntryType
  ref: React.RefObject<HTMLInputElement>
} & InputProps &
  FieldProps

export function MyInput<T extends object>({
  ref,
  name,
  control,
  entryType,
  classNames,
  onlyNumber,
  setValueAs,
  onSideEffect,
  isEnterPreventDefault,
  ...props
}: Partial<Props<T>>) {
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (isEnterPreventDefault) {
      e.preventDefault()
    }
    if (onlyNumber) {
      inputOnlyNumber(e, entryType)
    }
    props.onKeyDown?.(e)
  }

  if (props.hidden) return null

  if (control) {
    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field: { onChange, value, ...field }, fieldState }) => (
          <>
            <Input
              autoComplete="off"
              {...defaultInputProps(classNames)}
              {...props}
              {...field}
              value={setValueAs ? setValueAs(value) : value}
              onChange={(e) => {
                onChange(e)
                onSideEffect?.(e.target.value)
              }}
              errorMessage={fieldState.error?.message}
              onKeyDown={handleKeyDown}
            />
          </>
        )}
      />
    )
  }
  return (
    <Input
      ref={ref}
      autoComplete="off"
      {...defaultInputProps(classNames)}
      {...props}
      onChange={(e) => {
        props.onChange?.(e)
        onSideEffect?.(e.target.value)
      }}
      name={name}
      onKeyDown={handleKeyDown}
    />
  )
}
