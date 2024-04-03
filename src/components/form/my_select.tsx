import { Option } from "@configs/interfaces"
import { Select, SelectItem, SelectProps, SlotsToClasses } from "@nextui-org/react"
import { Control, Controller, Path } from "react-hook-form"

type OmitedProps =
  | "children"
  | "disabledKeys"
  | "selectedKeys"
  | "renderValue"
  | "defaultSelectedKeys"
type ItemClassNames = SlotsToClasses<
  "description" | "base" | "title" | "wrapper" | "selectedIcon" | "shortcut"
>
type ClassNames = SlotsToClasses<
  | "description"
  | "errorMessage"
  | "label"
  | "base"
  | "value"
  | "mainWrapper"
  | "trigger"
  | "innerWrapper"
  | "selectorIcon"
  | "spinner"
  | "listboxWrapper"
  | "listbox"
  | "popoverContent"
  | "helperWrapper"
>

const defaultSelectProps = (
  classNames?: ClassNames,
): Omit<SelectProps, OmitedProps> => ({
  as: "div",
  size: "sm",
  radius: "sm",
  variant: "flat",
  selectionMode: "single",
  labelPlacement: "outside",
  classNames: {
    value: "!text-opacity-70",
    innerWrapper: "mb-0 pb-0",
    label: "first-letter:uppercase font-semibold !text-default-950",
    trigger:
      "focus-visible:!outline-transparent border border-default bg-default-200/50 hover:bg-default-200 focus-within:border-secondary transition-colors",
    ...classNames,
  },
})

interface Props<T extends object> extends Omit<SelectProps, OmitedProps> {
  value: string
  options: Option[]
  control: Control<T>
  defaultValue: string
  name: string | Path<T>
  itemClassNames: ItemClassNames
  ref: React.RefObject<HTMLSelectElement>
}

export function MySelect<T extends object>({
  ref,
  name,
  control,
  value = "",
  classNames,
  options = [],
  scrollRef = null,
  defaultValue = "",
  itemClassNames = {},
  ...props
}: Partial<Props<T>>) {
  if (control) {
    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field: { value: fieldValue, ...restField }, fieldState }) => (
          <Select
            scrollRef={scrollRef}
            disabledKeys={[fieldValue]}
            selectedKeys={[fieldValue]}
            defaultSelectedKeys={[defaultValue]}
            {...defaultSelectProps(classNames)}
            {...props}
            {...restField}
            errorMessage={fieldState.error?.message}>
            {options.map(({ key, label }) => (
              <SelectItem
                key={key}
                title={label}
                textValue={label}
                classNames={itemClassNames}>
                {label}
              </SelectItem>
            ))}
          </Select>
        )}
      />
    )
  }

  return (
    <Select
      ref={ref}
      scrollRef={scrollRef}
      disabledKeys={[value]}
      selectedKeys={[value]}
      {...defaultSelectProps(classNames)}
      {...props}>
      {options.map(({ key, label }) => (
        <SelectItem
          key={key}
          title={label}
          textValue={label}
          classNames={itemClassNames}>
          {label}
        </SelectItem>
      ))}
    </Select>
  )
}
