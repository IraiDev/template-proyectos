import { ZodObject, ZodRawShape, ZodError } from "zod"

type Parse<T> = { success: true; data: T } | { success: false; error: ZodError }
type Schema = ZodObject<ZodRawShape>

function createValidation<T extends object>(
  schema: Schema,
  entry: T,
): Record<keyof T, FormValidation> {
  const result: Record<keyof T, FormValidation> = {} as Record<keyof T, FormValidation>

  const parse = schema.safeParse(entry) as Parse<T>

  if (!parse.success) {
    const errors = parse.error.issues
    errors.forEach((el) => {
      result[el.path[0] as keyof T] = { error: true, message: el.message }
    })
  }

  return result
}
export const zodResolver =
  <T extends object>(schema: Schema) =>
  ({ name, value }: FormValidationProps<T>) => {
    const result = createValidation(schema, { [name]: value })
    return result[name as string]
  }
