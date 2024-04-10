import {
  Button,
  Checkbox,
  Chip,
  Input,
  Select,
  TableCell,
  TextItem,
} from "@components/index"
import { TableV2 } from "@components/shared/table_v2"
import { useAuth } from "@features/auth/hooks"
import { useFields, useQueryParams } from "@hooks/index"
import { sleep, toString } from "@utils/index"
import { useState } from "react"
import { Helmet } from "react-helmet"
import { SubmitHandler } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  es_mayor: z.boolean(),
  cargo: z.string().min(1, { message: "Requerido" }),
  nombre: z.string().min(1, { message: "Requerido" }),
})

type FormValues = z.infer<typeof schema>

const OPTIONS = [
  { key: "", label: "Seleccione" },
  { key: "1", label: "Admin" },
  { key: "2", label: "User" },
]

export const HomeView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [, setUsers] = useState<(FormValues & { id: number })[]>([])

  const { user, handleLogout } = useAuth()
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

      <section className="flex gap-1 w-96 items-center mx-auto">
        <strong>Filtros:</strong>
        <TextItem
          label="Nombre"
          value={watchQueryParam("nombre", "")}
          defaultValue="sin nombre..."
        />
        <TextItem
          label="Cargo"
          value={watchQueryParam("cargo", "")}
          defaultValue="sin cargo..."
        />
        <TextItem
          label="Es mayor"
          defaultValue="NO"
          value={watchQueryParam("es_mayor", false) ? "SI" : ""}
        />
        {/* <span>{watchQueryParam("es_mayor", false) ? "SI" : "NO"}</span> */}
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
        <UserTable />
      </section>

      <Helmet>
        <title>Inicio</title>
      </Helmet>
    </div>
  )
}

type UserType = FormValues & { id: number; checked: boolean }

function UserTable() {
  const dataset: UserType[] = Array.from({ length: 100_000 }).map((_, idx) => ({
    checked: false,
    id: idx + 1,
    cargo: (idx + 1).toString(),
    es_mayor: true,
    nombre: `User ${idx + 1}`,
  }))
  const [users, setUser] = useState(dataset)
  const [filter, setFilter] = useState("")

  const handleChangeCheckState = (user: UserType) => {
    setUser((prev) => {
      return prev.map((el) => {
        if (el.id === user.id) {
          return {
            ...el,
            checked: !el.checked,
          }
        }
        return el
      })
    })
  }

  const handleDeleteAllUser = () => {
    setUser([])
  }

  const handleAddAllUser = () => {
    setUser((prev) => [...prev, ...dataset])
  }

  return (
    <>
      <div className="flex justify-center gap-2 mb-2">
        <Button onClick={handleDeleteAllUser}>Eliminar todos</Button>
        <Button onClick={handleAddAllUser}>Agregar todos</Button>
      </div>

      <TableV2
        tableHeight={400}
        renderFilter={() => (
          <>
            <th colSpan={4}>
              <Input
                labelPlacement="outside"
                placeholder="Buscar..."
                className="mb-1"
                onKeyDown={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  if (e.key === "Enter") {
                    setFilter(value)
                  }
                }}
              />
            </th>
          </>
        )}
        columns={[
          { key: "5", width: 50, content: "", align: "center" },
          { key: "1", width: 250, content: "nombre", align: "left" },
          { key: "2", width: 100, content: "cargo", align: "center" },
          { key: "3", width: 70, content: "es mayor", align: "center" },
        ]}
        dataset={users.filter((el) =>
          el.nombre.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
        )}
        renderCells={(item) => (
          <>
            <TableCell>
              <Checkbox
                isSelected={item.checked}
                onValueChange={() => handleChangeCheckState(item)}
              />
            </TableCell>
            <TableCell align="left">{item.nombre}</TableCell>
            <TableCell align="center">
              <Chip>
                {OPTIONS.find((el) => el.key === item.cargo)?.label ?? "--"}
              </Chip>
            </TableCell>
            <TableCell align="center">{item.es_mayor ? "si" : "No"}</TableCell>
          </>
        )}
      />

      <div className="text-center mt-2">Total: {users.length}</div>
    </>
  )
}
