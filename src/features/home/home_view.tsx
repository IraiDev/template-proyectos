import {
  Button,
  Checkbox,
  Chip,
  Input,
  Select,
  Table,
  TableCell,
} from "@components/index"
import { ZodRecordSchema } from "@configs/types"
import { useLogout } from "@features/auth/hooks"
import { AuthStore } from "@features/auth/stores"
import { sleep, tableDatasetAdapter, toString } from "@utils/functions"
import { useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useFields, useQueryParams } from "@hooks/index"
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

const OPTIONS = [
  { key: "", label: "Seleccione" },
  { key: "1", label: "Admin" },
  { key: "2", label: "User" },
]

export const HomeView = () => {
  const user = AuthStore((state) => state.user)
  const { handleLogout } = useLogout()
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<(FormValues & { id: number })[]>([])
  const { queryParams, setQueryParams, watchQueryParam } =
    useQueryParams<keyof FormValues>()

  const { field, reset, handleSubmit } = useFields<FormValues>({
    validation: schema,
    defaultValues: {
      es_mayor: false,
      nombre: "",
      cargo: "",
    },
  })

  const onRegister: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true)
    await sleep(2)

    setUsers((prev) => [...prev, { ...values, id: prev.length + 1 }])

    for (const [key, value] of Object.entries(values)) {
      queryParams.set(key, toString(value))
    }

    setQueryParams(queryParams)
    reset()
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-10 h-screen bg-white">
      <header className="flex justify-between gap-2 p-4">
        <h1 className="text-2xl font-bold">Bienvenido {user}</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </header>

      <section className="flex gap-1 w-96 mx-auto">
        <strong>Filtros:</strong>
        <span>{watchQueryParam("nombre", "sin nombre")},</span>
        <span>{watchQueryParam("cargo", "--")},</span>
        <span>{watchQueryParam("es_mayor", false) ? "SI" : "NO"}</span>
      </section>

      <form
        onSubmit={handleSubmit(onRegister)}
        className="w-96 mx-auto flex flex-col gap-2">
        <Input {...field("nombre", { label: "Nombre" })} />
        <Select {...field("cargo", { label: "Cargo" })} options={OPTIONS} />
        <Checkbox {...field("es_mayor")}>Es mayor</Checkbox>
        <Button type="submit" isLoading={isLoading}>
          Registrar
        </Button>
      </form>
      <section>
        <Table
          isLoading={isLoading}
          wrapperClassName="max-w-3xl mx-auto"
          columns={[
            { key: "1", content: "nombre", align: "left" },
            { key: "2", content: "cargo", align: "center" },
            { key: "3", content: "es mayor", align: "center" },
          ]}
          dataset={tableDatasetAdapter(users, "id")}
          renderCells={(item) => (
            <>
              <TableCell align="left" className="min-w-max">
                {item.nombre}
              </TableCell>
              <TableCell align="center" className="w-64">
                <Chip>
                  {OPTIONS.find((el) => el.key === item.cargo)?.label ?? "--"}
                </Chip>
              </TableCell>
              <TableCell align="center" className="w-10">
                {item.es_mayor ? "si" : "No"}
              </TableCell>
            </>
          )}
        />
      </section>
    </div>
  )
}
