import { useCallback, useRef, useState } from "react"

interface Props<T extends object> {
  defaultValues: Record<FieldName<T>, FieldValues>
  validation?(props: FormValidationProps<T>): FormValidation
}

export function useForm<T extends object>({ defaultValues, validation }: Props<T>): UseForm<T> {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<FormError<T>>({} as FormError<T>)
  const [touched, setTouched] = useState<FormTouched<T>>({} as FormTouched<T>)

  const handleSubmit = useCallback(
    (submit: (values: T) => void) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()
      const form = e.target as HTMLFormElement
      const values: Record<FieldName<T>, FieldValues> = Object.assign({}, defaultValues)

      for (const key in values) {
        if (typeof defaultValues[key] === "boolean") {
          values[key] = form[key].checked
        } else {
          values[key] = form[key].value
        }
      }

      const errorStates = Object.entries(values).map(([name, value]) => {
        const v = validation?.({ name: name as keyof T, value: value as FieldValues })

        if (v?.error) {
          setTouched((prev) => ({ ...prev, [name]: true }))
          setErrors((prev) => ({ ...prev, [name]: v?.message ?? "" }))
        }

        return v?.error ?? false
      })

      if (errorStates.some((el) => el)) return

      submit(values as T)
    },
    [defaultValues, validation],
  )

  const onChange = useCallback(
    (e: React.ChangeEvent<FieldElements>, setValue?: SetValue) => {
      const name = e.target.name as FieldName<T>
      const value = e.target.value
      const type = e.target.type

      if (formRef.current && setValue) {
        const field = formRef.current.elements.namedItem(name as string) as FieldElements
        if (!field) return
        field.value = setValue(value)
      }

      if (type === "checkbox" || !validation) return

      const v = validation?.({ name, value })

      if (!touched?.[name]) {
        setTouched((prev) => ({ ...prev, [name]: true }))
      }

      if (v?.error && errors?.[name] !== v?.message) {
        setErrors((prev) => ({ ...prev, [name]: v?.message ?? "" }))
        return
      }

      if (errors?.[name] !== "" && !v?.error) {
        setErrors((prev) => ({ ...prev, [name]: "" }))
      }
    },
    [errors, touched, validation],
  )

  const onBlur = useCallback(
    (e: React.ChangeEvent<FieldElements>, setValue?: SetValue) => {
      const name = e.target.name as FieldName<T>
      const value = e.target.value
      const type = e.target.type

      if (formRef.current && setValue) {
        const field = formRef.current.elements.namedItem(name as string) as FieldElements
        if (!field) return
        field.value = setValue(value)
      }

      if (type === "checkbox" || !validation) return

      const v = validation?.({ name, value })

      if (v?.error && errors?.[name] === "") {
        setErrors((prev) => ({ ...prev, [name]: v?.message ?? "" }))
      }

      if (!touched?.[name]) {
        setTouched((prev) => ({ ...prev, [name]: true }))
      }
    },
    [errors, touched, validation],
  )

  const onReset = useCallback(() => {
    if (formRef.current === null) return
    formRef.current.reset()
  }, [])

  const onClear = useCallback(() => {
    if (formRef.current === null) return
    for (const entry of formRef.current.elements) {
      const field = entry as FieldElements
      field.value = ""
    }
  }, [])

  const formField = useCallback(
    (name: FieldName<T>, options?: FormFieldOptions): FormField<T> => {
      const isBoolean = typeof defaultValues[name] === "boolean"
      const defaultValue = options?.defaultValue ?? (defaultValues[name] as string)
      const defaultChecked = options?.defaultChecked ?? (defaultValues[name] as boolean)
      const errorMessage = errors?.[name] ?? ""

      const fieldProps = {
        name,
        type: options?.type ?? "text",
        errorMessage: touched?.[name] ? errorMessage : "",
        defaultValue: !isBoolean ? defaultValue : "",
        defaultChecked: isBoolean ? defaultChecked : false,
        onChange: (e: React.ChangeEvent<FieldElements>) => onChange(e, options?.setValue),
        onBlur: (e: React.ChangeEvent<FieldElements>) => onBlur(e),
      }

      return fieldProps
    },
    [defaultValues, errors, touched, onChange, onBlur],
  )

  const setError = useCallback((name: FieldName<T>, value: string) => {
    setErrors((prev) => (prev ? { ...prev, [name]: value } : prev))
  }, [])

  const setTouch = useCallback((name: FieldName<T>, value: boolean) => {
    setTouched((prev) => (prev ? { ...prev, [name]: value } : prev))
  }, [])

  const setValues = useCallback(
    (entry: Partial<Record<FieldName<T>, FieldValues>>) => {
      const form = formRef.current
      if (form === null) return

      Object.entries(entry).forEach(([name, value]) => {
        const v = validation?.({ name: name as keyof T, value: value as FieldValues })

        if (v?.error) {
          setTouched((prev) => ({ ...prev, [name]: true }))
          setErrors((prev) => ({ ...prev, [name]: v?.message ?? "" }))
        }
      })

      for (const key in entry) {
        if (typeof defaultValues[key] === "boolean") {
          form[key].checked = entry[key]
        } else {
          form[key].value = entry[key]
        }
      }
    },
    [defaultValues, validation],
  )

  const watch = useCallback(
    (name: FieldName<T>, callback: (value: FieldValues) => boolean) => {
      const form = formRef.current

      if (form === null) return false

      if (typeof defaultValues[name] === "boolean") {
        return callback(form[name as string].checked)
      }

      return callback(form[name as string].value)
    },
    [defaultValues],
  )

  return {
    formRef,
    errors,
    touched,
    formField,
    handleSubmit,
    onChange,
    onBlur,
    setError,
    setErrors,
    setTouch,
    setTouched,
    setValues,
    onReset,
    onClear,
    watch,
  }
}
