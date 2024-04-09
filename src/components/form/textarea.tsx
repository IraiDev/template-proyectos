import { FieldProps } from "@configs/interfaces"
import { FieldEventHandler } from "@configs/types"
import { TextAreaProps, Textarea as NextTextarea } from "@nextui-org/react"
import { ChangeEvent } from "react"
import { Control, Controller, Path } from "react-hook-form"

type Props<T extends object> = {
  control: Control<T>
  name: Path<T> | string
  ref: React.RefObject<HTMLTextAreaElement>
  onChange(e: ChangeEvent<HTMLInputElement>): void
} & ExtendsProps

export function Textarea<T extends object>({
  ref,
  name,
  hidden,
  control,
  ...props
}: Partial<Props<T>>) {
  const handleChange: FieldEventHandler<HTMLInputElement> = (onChange) => (e) => {
    onChange?.(e) ?? props.onChange?.(e)
    props.onSideEffect?.(e.target.value)
  }

  if (hidden) return null

  if (control) {
    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field: { onChange, ...field }, fieldState }) => (
          <NextTextarea
            {...props}
            {...field}
            onChange={handleChange(onChange)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
    )
  }

  return <NextTextarea ref={ref} {...props} name={name} onChange={handleChange()} />
}

type ExtendsProps = Omit<TextAreaProps, "onChange"> & FieldProps
