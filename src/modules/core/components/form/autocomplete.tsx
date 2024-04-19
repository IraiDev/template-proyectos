import { NEXT_UI_DEFAULT_STYLES_PROPS } from "@config/constants"
import { FieldProps, Option } from "@config/interfaces"
import { SpecialFieldEventHandler } from "@config/types"
import {
  AutocompleteItem,
  AutocompleteProps,
  Autocomplete as NextAutocomplete,
  SlotsToClasses,
} from "@nextui-org/react"
import { useCallback } from "react"
import { Control, Controller, Path } from "react-hook-form"

type Props<T extends object> = {
  value: string
  options: Option[]
  control: Control<T>
  defaultValue: string
  name: string | Path<T>
  itemClassNames: ItemClassNames
  ref: React.RefObject<HTMLSelectElement>
} & ExtendsProps

export function Select<T extends object>({
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
}: Partial<Props<T>>) {
  const handleChange: SpecialFieldEventHandler<React.Key> =
    (onSelectionChange) => (value) => {
      onSelectionChange?.(value) ?? props.onSelectionChange?.(value.toString())
      props.onSideEffect?.(value.toString())
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
          <NextAutocomplete
            {...initDefaultProps}
            {...defaultProps(fieldValue)}
            {...props}
            {...field}
            onSelectionChange={handleChange(onChange)}
            errorMessage={fieldState.error?.message}>
            {options.map((option) => (
              <AutocompleteItem {...optionsDefaultProps(option)}>
                {option.label}
              </AutocompleteItem>
            ))}
          </NextAutocomplete>
        )}
      />
    )
  }

  return (
    <NextAutocomplete
      ref={ref}
      {...initDefaultProps}
      {...defaultProps(value)}
      {...props}
      name={name}
      onSelectionChange={handleChange()}>
      {options.map((option) => (
        <AutocompleteItem {...optionsDefaultProps(option)}>
          {option.label}
        </AutocompleteItem>
      ))}
    </NextAutocomplete>
  )
}

type ExtendsProps = Omit<AutocompleteProps, OmitedProps> & FieldProps
type OmitedProps =
  | "children"
  | "disabledKeys"
  | "selectedKeys"
  | "renderValue"
  | "defaultSelectedKeys"
type ItemClassNames = SlotsToClasses<
  "description" | "base" | "title" | "wrapper" | "selectedIcon" | "shortcut"
>

const initDefaultProps: Omit<AutocompleteProps, "children"> = {
  as: "div",
  ...NEXT_UI_DEFAULT_STYLES_PROPS,
}
