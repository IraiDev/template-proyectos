import { useForm as useReactHookForm, UseFormProps, RegisterOptions, Path } from "react-hook-form"

export function useForm<T extends object>(props: UseFormProps<T>) {
  const { register: innerRegister, ...reactHookForm } = useReactHookForm(props)

  function register(name: Path<T>, options: RegisterOptions | undefined = {}) {
    return {
      ...innerRegister(name, options),
      errorMessage: reactHookForm.formState.errors[name]?.message ?? "",
      // TODO: este control de mensajes de error es para next-ui, cambiar dependiendo de la implamentacion
    }
  }

  return {
    ...reactHookForm,
    register,
  }
}
