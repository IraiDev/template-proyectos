import { FieldProps } from "@configs/interfaces"
import { InputType } from "@configs/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback } from "react"
import { Control, Path, UseFormProps, useForm } from "react-hook-form"

interface Props<T extends object> extends Omit<UseFormProps<T>, "resolver"> {
  validation?: any
}

export function useFields<T extends object>(props?: Props<T>) {
  const form = useForm({
    ...props,
    resolver: props?.validation ? zodResolver(props?.validation) : undefined,
  })

  const field = useCallback(
    (name: Path<T>, options?: UseFieldOptions<T>): UseFieldReturn<T> => {
      return {
        name,
        ...options,
        control: form.control,
        type: options?.type ?? "text",
      }
    },
    [form.control],
  )

  return {
    ...form,
    field,
  }
}

type UseFieldOptions<T extends object> = {
  control?: Control<T>
  type?: InputType
  label?: string
} & FieldProps

type UseFieldReturn<T extends object> = { name?: Path<T> } & Omit<
  UseFieldOptions<T>,
  ""
>
