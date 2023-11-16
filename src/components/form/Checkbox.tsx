import React from "react"
import { CheckboxProps, Checkbox as NextCheckbox } from "@nextui-org/react"
import { Control, Controller, Path } from "react-hook-form"

interface Props<T extends object> extends CheckboxProps {
  name: Path<T>
  label: string
  checked: boolean
  control: Control<T>
}

export const Checkbox = React.forwardRef(function <T extends object>(
  { control, ...props }: Partial<Props<T>>,
  ref: React.ForwardedRef<HTMLLabelElement>,
) {
  if (control && props.name) {
    return (
      <Controller
        name={props.name}
        control={control}
        render={({ field: { value, ...field } }) => (
          <CustomCheckbox {...props} {...field} isSelected={value} />
        )}
      />
    )
  }

  return <CustomCheckbox ref={ref} {...props} isSelected={props.checked} />
})

const CustomCheckbox = React.forwardRef(function (
  props: CheckboxProps,
  ref: React.ForwardedRef<HTMLLabelElement>,
) {
  return <NextCheckbox ref={ref} {...props} />
})
