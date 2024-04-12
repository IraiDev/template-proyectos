import { FieldProps } from "@config/interfaces"
import { InputType } from "@config/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback } from "react"
import { Control, FieldValue, Path, UseFormProps, useForm } from "react-hook-form"

interface Props<T extends object> extends Omit<UseFormProps<T>, "resolver"> {
  validation?: any
}

export function useFields<T extends object>(props?: Props<T>) {
  const form = useForm({
    ...props,
    resolver: props?.validation ? zodResolver(props?.validation) : undefined,
  })

  const { watch, control: formControl } = form

  const field: UseField<T> = useCallback(
    (name, options) => {
      return {
        name,
        ...options,
        control: formControl,
        type: options?.type ?? "text",
      }
    },
    [formControl],
  )

  const formValues = useCallback(
    (target: Path<T>[]) => {
      const temp: Partial<Record<Path<T>, FieldValue<T>>> = {}

      for (const key of target) {
        temp[key] = watch(key)
      }

      return temp
    },
    [watch],
  )

  return {
    ...form,
    field,
    formValues,
  }
}

type UseFieldOptions<T extends object> = {
  control?: Control<T>
  type?: InputType
  label?: string
} & FieldProps

type UseFieldReturn<T extends object> = { name?: Path<T> } & UseFieldOptions<T>

export type UseField<T extends object> = (
  name: Path<T>,
  options?: UseFieldOptions<T>,
) => UseFieldReturn<T>
