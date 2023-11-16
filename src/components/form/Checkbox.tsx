import { Checkbox as NextCheckbox, CheckboxProps, extendVariants } from "@nextui-org/react"
import { Control, Controller, Path } from "react-hook-form"

interface Props<T extends object> extends CheckboxProps {
  name: Path<T>
  label: string
  checked: boolean
  control: Control<T>
}

export function Checkbox<T extends object>({ control, ...props }: Partial<Props<T>>) {
  if (control && props.name) {
    return (
      <Controller
        name={props.name}
        control={control}
        render={({ field: { value, ...field } }) => (
          <MyCheckbox {...props} {...field} isSelected={value} />
        )}
      />
    )
  }

  return <MyCheckbox {...props} isSelected={props.checked} />
}

const MyCheckbox = extendVariants(NextCheckbox, {
  defaultVariants: {
    size: "md",
    color: "primary",
  },
})
