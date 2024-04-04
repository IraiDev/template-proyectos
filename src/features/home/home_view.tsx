import {
  MyButton,
  MyCheckbox,
  MyInput,
  MySelect,
  MyTable,
  MyTableCell,
} from "@components/index"
import { ZodRecordSchema } from "@configs/types"
import { useLogout } from "@features/auth/hooks"
import { useAuthStore } from "@features/auth/stores"
import { tableDatasetAdapter } from "@utils/functions"
import { useFields } from "@utils/hooks"
import { useState } from "react"
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
  const { handleLogout } = useLogout()
  const [users, setUsers] = useState<(FormValues & { id: number })[]>([])

  const { field, reset, handleSubmit } = useFields<FormValues>({
    validation: schema,
    defaultValues: {
      es_mayor: false,
      nombre: "",
      cargo: "",
    },
  })

  const onRegister: SubmitHandler<FormValues> = (values) => {
    setUsers((prev) => [...prev, { ...values, id: prev.length + 1 }])
    reset()
  }

  return (
    <div className="flex flex-col gap-10 h-screen">
      <header className="flex justify-between gap-2 p-4">
        <h1 className="text-2xl font-bold">Bienvenido {user}</h1>
        <MyButton onClick={handleLogout}>Logout</MyButton>
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
      <section>
        <MyTable
          wrapperClassName="max-w-3xl mx-auto"
          columns={[
            { key: "1", content: "nombre", align: "center" },
            { key: "2", content: "cargo", align: "center" },
            { key: "3", content: "es mayor", align: "center" },
          ]}
          dataset={tableDatasetAdapter(users, "id")}
          renderCells={(item) => (
            <>
              <MyTableCell>{item.nombre}</MyTableCell>
              <MyTableCell>{item.cargo}</MyTableCell>
              <MyTableCell>{item.es_mayor ? "si" : "No"}</MyTableCell>
            </>
          )}
        />
      </section>
    </div>
  )
}
