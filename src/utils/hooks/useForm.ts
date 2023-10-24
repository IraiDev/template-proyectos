import { useForm as useReactHookForm, UseFormProps, RegisterOptions, Path } from "react-hook-form"

export function useForm<T extends object>(props: UseFormProps<T>) {
  const {
    register: innerRegister,
    control: innerControl,
    ...reactHookForm
  } = useReactHookForm(props)

  function register(name: Path<T>, options: RegisterOptions | undefined = {}) {
    return {
      ...innerRegister(name, options),
      errorMessage: reactHookForm.formState.errors[name]?.message ?? "",
      // TODO: este control de mensajes de error es para next-ui, cambiar dependiendo de la implamentacion
    }
  }

  function control(name: Path<T>) {
    return {
      name,
      control: innerControl,
      errorMessage: innerControl._formState.errors[name]?.message,
      // TODO: este control de mensajes de error es para next-ui, cambiar dependiendo de la implamentacion
    }
  }

  return {
    ...reactHookForm,
    register,
    control,
  }
}
