import { FieldProps } from "@configs/interfaces"
import { Checkbox, CheckboxProps } from "@nextui-org/react"
import { RefCallback } from "react"
import { Control, Controller, Path } from "react-hook-form"

type Props<T extends object> = {
  control: Control<T>
  name: string | Path<T>
  ref: React.RefObject<HTMLLabelElement> | RefCallback<HTMLLabelElement>
} & Omit<CheckboxProps, "ref" | "name"> &
  FieldProps

export function MyCheckbox<T extends object>({
  ref,
  name,
  control,
  ...props
}: Partial<Props<T>>) {
  if (control !== undefined) {
    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field: { value, ...restField } }) => (
          <DefaultCheckbox {...props} {...restField} isSelected={value} />
        )}
      />
    )
  }

  return <DefaultCheckbox ref={ref} name={name} />
}

function DefaultCheckbox<T extends object>(props: Partial<Props<T>>) {
  return <Checkbox ref={props.ref} size="sm" radius="sm" {...props} />
}
