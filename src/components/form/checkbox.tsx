import { FieldProps } from "@configs/interfaces"
import { FieldEventHandler } from "@configs/types"
import { CheckboxProps, Checkbox as NextCheckbox } from "@nextui-org/react"
import { Control, Controller, Path } from "react-hook-form"

type Props<T extends object> = {
  control: Control<T>
  name: string | Path<T>
  ref: React.RefObject<HTMLLabelElement>
} & ExtendsProps

export function Checkbox<T extends object>({
  ref,
  name,
  hidden,
  control,
  ...props
}: Partial<Props<T>>) {
  const handleChange: FieldEventHandler<HTMLInputElement> = (onChange) => (e) => {
    onChange?.(e) ?? props.onChange?.(e)
    props.onSideEffect?.(e.target.checked)
  }

  if (hidden) return null

  if (control !== undefined) {
    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field: { value, onChange, ...field } }) => (
          <NextCheckbox
            {...props}
            {...field}
            isSelected={value}
            onChange={handleChange(onChange)}
          />
        )}
      />
    )
  }

  return <NextCheckbox ref={ref} name={name} onChange={handleChange()} />
}

type ExtendsProps = Omit<CheckboxProps, "ref" | "name"> & FieldProps
