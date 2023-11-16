import { Select as NextSelect, SelectItem, SelectProps, SlotsToClasses } from "@nextui-org/react"
import { Control, Controller, Path } from "react-hook-form"

interface Props<T extends object>
  extends Omit<SelectProps, "children" | "disabledKeys" | "selectedKeys" | "renderValue"> {
  value: string
  name?: Path<T>
  options: Option[]
  control?: Control<T>
  itemClassNames?: SlotsToClasses<
    "description" | "base" | "title" | "wrapper" | "selectedIcon" | "shortcut"
  >
}

export function Select<T extends object>({
  control,
  options,
  value,
  name,
  itemClassNames,
  ...props
}: Props<T>) {
  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { value, ...field } }) => (
          <CustomSelect {...props} {...field} disabledKeys={[value]} selectedKeys={[value]}>
            {options.map((option) => (
              <SelectItem key={option.key} textValue={option.key} classNames={itemClassNames ?? {}}>
                {option.label}
              </SelectItem>
            ))}
          </CustomSelect>
        )}
      />
    )
  }

  return (
    <CustomSelect {...props} selectedKeys={[value]} disabledKeys={[value]}>
      {options.map((option) => (
        <SelectItem key={option.key} textValue={option.key} classNames={itemClassNames ?? {}}>
          {option.label}
        </SelectItem>
      ))}
    </CustomSelect>
  )
}

function CustomSelect({ classNames, ...props }: SelectProps) {
  return (
    <NextSelect
      variant="flat"
      labelPlacement="outside"
      size="md"
      selectionMode="single"
      classNames={{
        trigger:
          "focus-visible:!outline-primary border border-transparent bg-default-200/50 hover:bg-default-200 focus-within:!border-default-300 transition-colors",
        innerWrapper: "mb-0 pb-0",
        value: "!text-opacity-70",
        label: "first-letter:uppercase font-semibold !text-default-950",
        ...classNames,
      }}
      {...props}
    />
  )
}
