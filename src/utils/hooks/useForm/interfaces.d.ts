interface FormValidation {
  error: boolean
  message: string
}

interface FormValidationProps<T extends object> {
  name: keyof T
  value: FieldValues
}

interface FormField<T extends object> {
  errorMessage: string
  defaultValue: string
  defaultChecked: boolean
  name: keyof T
  type: FieldTypes
  onChange?(e: React.ChangeEvent<FieldElements>): void
  onBlur?(e: React.ChangeEvent<FieldElements>): void
}

interface FormFieldOptions {
  type?: FieldTypes
  controlError?: boolean
  defaultValue?: string
  defaultChecked?: boolean
  setValue?: SetValue
}

interface UseForm<T extends object> {
  formRef: React.RefObject<HTMLFormElement>
  errors: FormError
  touched: FormTouched
  onReset: () => void
  onClear: () => void
  watch: (name: keyof T, callback: (value: FieldValues) => boolean) => boolean
  formField: (name: keyof T, options?: FormFieldOptions) => FormField<T>
  onBlur: (e: React.ChangeEvent<FieldElements>, setValue?: SetValue) => void
  onChange: (e: React.ChangeEvent<FieldElements>, setValue?: SetValue) => void
  handleSubmit: (submit: (values: T) => void) => (e: React.FormEvent<HTMLFormElement>) => void
  setTouch: (name: keyof T, value: boolean) => void
  setTouched: React.Dispatch<React.SetStateAction<FormTouched>>
  setError: (name: keyof T, value: string) => void
  setErrors: React.Dispatch<React.SetStateAction<FormError>>
  setValues: (entry: Partial<Record<keyof T, FieldValues>>) => void
}
