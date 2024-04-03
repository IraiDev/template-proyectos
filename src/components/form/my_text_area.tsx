import { SlotsToClasses, TextAreaProps, Textarea } from "@nextui-org/react"
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

const defaulTextareaProps = (classNames?: ClassNames): TextAreaProps => ({
  size: "sm",
  radius: "sm",
  variant: "flat",
  placeholder: " ",
  labelPlacement: "outside",
  classNames: {
    input: "!text-opacity-70 placeholder:!text-opacity-50",
    label: "first-letter:uppercase font-semibold !text-default-950",
    inputWrapper:
      "!ring-transparent border border-default focus-within:border-secondary bg-default-100 hover:bg-default-200 !shadow-none transition-colors",
    ...classNames,
  },
})

interface Props<T extends object> extends TextAreaProps {
  control: Control<T>
  name: Path<T> | string
  ref: React.RefObject<HTMLTextAreaElement>
}

export function MyTextarea<T extends object>({
  ref,
  name,
  control,
  classNames,
  ...props
}: Partial<Props<T>>) {
  if (control) {
    return (
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field, fieldState }) => (
          <Textarea
            {...defaulTextareaProps(classNames)}
            {...props}
            {...field}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
    )
  }

  return (
    <Textarea
      ref={ref}
      {...defaulTextareaProps(classNames)}
      {...props}
      name={name}
    />
  )
}
