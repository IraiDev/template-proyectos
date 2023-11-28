type FieldValues = string | boolean
type FieldTypes = "text" | "password" | "date" | "checkbox"
type FieldElements = HTMLInputElement | HTMLSelectElement
type FormError<T extends object> = Record<keyof T, string>
type FormTouched<T extends object> = Record<keyof T, boolean>
type FieldName<T extends object> = keyof T
type SetValue = (value: string) => string
