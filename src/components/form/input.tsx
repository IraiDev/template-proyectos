import { FieldProps } from "@configs/interfaces"
import { FieldEventHandler, InputOnlyNumberEntryType } from "@configs/types"
import { InputProps, Input as NextInput } from "@nextui-org/react"
import { KeyboardEventHandler } from "react"
import { Control, Controller, Path } from "react-hook-form"

type Props<T extends object> = {
  control: Control<T>
  onlyNumber: boolean
  name: Path<T> | string
  isPreventDefaultEnter: boolean
  entryType: InputOnlyNumberEntryType
  ref: React.RefObject<HTMLInputElement>
} & ExtendsProps

export function Input<T extends object>({
  ref,
  name,
  hidden,
  control,
  entryType,
  onlyNumber,
  setValueAs,
  onSideEffect,
  isPreventDefaultEnter,
  ...props
}: Partial<Props<T>>) {
  const handleKeyDown: KeyboardEvent = (e) => {
    if (isPreventDefaultEnter && e.key === "Enter") {
      e.preventDefault()
    }
    if (onlyNumber) {
      inputOnlyNumber(e, entryType)
    }
    props.onKeyDown?.(e)
  }

  const handleChange: FieldEventHandler<HTMLInputElement> = (onChange) => (e) => {
    onChange?.(e) ?? props.onChange?.(e)
    onSideEffect?.(e.target.value)
  }

  if (hidden) return null

  if (control) {
    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field: { onChange, value, ...field }, fieldState }) => (
          <>
            <NextInput
              size="sm"
              radius="sm"
              variant="flat"
              autoComplete="off"
              {...props}
              {...field}
              onKeyDown={handleKeyDown}
              onChange={handleChange(onChange)}
              errorMessage={fieldState.error?.message}
              value={setValueAs ? setValueAs(value) : value}
            />
          </>
        )}
      />
    )
  }
  return (
    <NextInput
      ref={ref}
      size="sm"
      radius="sm"
      name={name}
      variant="flat"
      autoComplete="off"
      onChange={handleChange()}
      onKeyDown={handleKeyDown}
      {...props}
    />
  )
}

type ExtendsProps = InputProps & FieldProps
type KeyboardEvent = KeyboardEventHandler<HTMLInputElement>

function inputOnlyNumber(
  e: React.KeyboardEvent<HTMLInputElement>,
  entryType: InputOnlyNumberEntryType | undefined = "positive",
) {
  const char = e.key

  const value: string = (e.target as HTMLInputElement).value
  const cursorPosition: number = (e.target as HTMLInputElement).selectionStart || 0

  if (entryType === "positive" && char === "-") {
    e.preventDefault()
  }

  if (entryType === "negative" && char !== "-" && cursorPosition === 0) {
    e.preventDefault()
  }

  if (
    !/[0-9.-]/.test(char) &&
    char !== "Backspace" &&
    char !== "Delete" &&
    char !== "ArrowLeft" &&
    char !== "ArrowRight" &&
    char !== "Escape" &&
    char !== "Enter" &&
    char !== "Tab"
  ) {
    e.preventDefault()
  }

  if (char === "-" && cursorPosition !== 0) {
    e.preventDefault()
  }

  if (char === "." && cursorPosition === 0) {
    e.preventDefault()
  }

  if (char === "." && value.includes(".")) {
    e.preventDefault()
  }
}
