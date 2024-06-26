import { FieldProps, Option } from "@config/interfaces"
import { FieldEventHandler } from "@config/types"
import {
  Select as NextSelect,
  SelectItem,
  SelectProps,
  SlotsToClasses,
} from "@nextui-org/react"
import { useCallback } from "react"
import { Control, Controller, Path } from "react-hook-form"
import { NEXT_UI_DEFAULT_STYLES_PROPS } from "@config/constants"

type Props<T extends object> = {
  value: string
  options: Option[]
  control: Control<T>
  defaultValue: string
  name: string | Path<T>
  itemClassNames: ItemClassNames
  ref: React.RefObject<HTMLSelectElement>
} & ExtendsProps

const Select = <T extends object>({
  ref,
  name,
  hidden,
  control,
  value = "",
  options = [],
  scrollRef = null,
  defaultValue = "",
  itemClassNames = {},
  ...props
}: Partial<Props<T>>) => {
  const handleChange: FieldEventHandler<HTMLSelectElement> =
    (onChange) => (e) => {
      onChange?.(e) ?? props.onChange?.(e)
      props.onSideEffect?.(e.target.value)
    }

  const defaultProps = useCallback(
    (currentValue: string) => ({
      scrollRef,
      disabledKeys: [currentValue],
      selectedKeys: [currentValue],
      defaultSelectedKeys: [defaultValue],
    }),
    [defaultValue, scrollRef],
  )

  const optionsDefaultProps = useCallback(
    (option: Option) => ({
      ...option,
      classNames: itemClassNames,
    }),
    [itemClassNames],
  )

  if (hidden) return null

  if (control) {
    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({
          field: { value: fieldValue, onChange, ...field },
          fieldState,
        }) => (
          <NextSelect
            {...initDefaultProps}
            {...defaultProps(fieldValue)}
            {...props}
            {...field}
            onChange={handleChange(onChange)}
            errorMessage={fieldState.error?.message}
          >
            {options.map((option) => (
              <SelectItem {...optionsDefaultProps(option)}>
                {option.label}
              </SelectItem>
            ))}
          </NextSelect>
        )}
      />
    )
  }

  return (
    <NextSelect
      ref={ref}
      {...initDefaultProps}
      {...defaultProps(value)}
      {...props}
      name={name}
      onChange={handleChange()}
    >
      {options.map((option) => (
        <SelectItem {...optionsDefaultProps(option)}>{option.label}</SelectItem>
      ))}
    </NextSelect>
  )
}

export default Select

type ExtendsProps = Omit<SelectProps, OmitedProps> & FieldProps
type OmitedProps =
  | "children"
  | "disabledKeys"
  | "selectedKeys"
  | "renderValue"
  | "defaultSelectedKeys"
type ItemClassNames = SlotsToClasses<
  "description" | "base" | "title" | "wrapper" | "selectedIcon" | "shortcut"
>

const initDefaultProps: Omit<SelectProps, "children"> = {
  as: "div",
  ...NEXT_UI_DEFAULT_STYLES_PROPS,
}
