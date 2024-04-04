import { MyButton, MyCheckbox, MyInput, MySelect } from "@components/index"
import { ZodRecordSchema } from "@configs/types"
import { useAuthStore } from "@features/auth/stores"
import { useFields } from "@utils/hooks"
import { SubmitHandler } from "react-hook-form"
import { z } from "zod"

type FormValues = {
  es_mayor: boolean
  nombre: string
  cargo: string
}

const schema = z.object<ZodRecordSchema<FormValues>>({
  cargo: z.string().min(1, { message: "Requerido" }),
  es_mayor: z.boolean(),
  nombre: z.string().min(1, { message: "Requerido" }),
})

export const HomeView = () => {
  const user = useAuthStore((state) => state.user)

  const { field, handleSubmit } = useFields<FormValues>({
    validation: schema,
    defaultValues: {
      es_mayor: false,
      nombre: "",
      cargo: "",
    },
  })

  const onRegister: SubmitHandler<FormValues> = (values) => {
    alert(JSON.stringify(values))
  }

  return (
    <div className="flex flex-col gap-10 h-screen">
      <header>
        <h1 className="text-2xl font-bold">Bienvenido {user}</h1>
      </header>
      <form
        onSubmit={handleSubmit(onRegister)}
        className="w-96 mx-auto flex flex-col gap-2">
        <MyInput {...field("nombre", { label: "Nombre" })} />
        <MySelect
          {...field("cargo", { label: "Cargo" })}
          options={[
            { key: "", label: "Seleccione" },
            { key: "1", label: "Admin" },
            { key: "2", label: "User" },
          ]}
        />
        <MyCheckbox {...field("es_mayor")}>Es mayor</MyCheckbox>
        <MyButton type="submit">Registrar</MyButton>
      </form>
    </div>
  )
}
