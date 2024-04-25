import { ICON_SIZE } from "@config/constants"
import { useAuth } from "@modules/auth/hooks"
import {
  AutoComplete,
  Button,
  Checkbox,
  Chip,
  Input,
  TableCell,
  TextItem,
} from "@modules/core/components"
import { VirtualizedTable } from "@modules/core/components/ui/virtualized_table"
import { useFields, useQueryParams } from "@modules/core/hooks"
import { useDisclosure } from "@nextui-org/react"
import { IconX } from "@tabler/icons-react"
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
  // { key: "", label: "Seleccione" },
  { key: "1", label: "Admin" },
  { key: "2", label: "User" },
]

export const HomeView = () => {
  const [progress, setProgress] = useState(0)
  const [fileKey, setFileKey] = useState("asd")

  const queryClient = useQueryClient()
  const {
    data = [],
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  })

  const fileMutation = useMutation({
    mutationFn: async (file: File | null) => {
      if (file === null) {
        throw new Error("NO hay archivo")
      }

      const formData = new FormData()
      formData.append("archivo", file)

      await axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
        method: "POST",
        headers: {
          "Content-type": ContentType.FORMDATA,
        },
        onUploadProgress: (e) => {
          if (e.loaded && e.total) {
            const value = (e.loaded / e.total) * 100
            setProgress(Math.round(value))
          }
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
      setProgress(0)
      setFileKey((Math.random() * 1000).toString())
    },
    onError: (e) => {
      alert(e)
      setProgress(0)
      setFileKey((Math.random() * 1000).toString())
    },
  })

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="h-10 flex justify-between">
        <span className="bg-green-500">{isLoading && "Cargando..."}</span>
        <span className="bg-blue-500">
          {isFetching && "Obteniendo nuevos datos..."}
        </span>
        <span className="bg-red-500">
          {isRefetching && "Obteniendo nuevos datos..."}
        </span>
        <Files
          key={fileKey}
          onChange={(e) => fileMutation.mutate(e.target.files?.[0] ?? null)}
        />
        {/* <span>{watchQueryParam("es_mayor", false) ? "SI" : "NO"}</span> */}
      </section>

      <form
        onSubmit={handleSubmit(onRegister)}
        className="w-96 mx-auto flex flex-col gap-2">
        <Input {...field("nombre", { label: "Nombre" })} />
        <AutoComplete {...field("cargo", { label: "Cargo" })} options={OPTIONS} />
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

const ButtonNew = ({ progress }: { progress: number }) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
    onError: (e) => {
      alert(e)
    },
  })

  return (
    <Button
      onClick={() =>
        mutation.mutate({
          body: "test de iongrso post",
          title: "nuevo post",
          userId: 1,
        })
      }>
      Nuevo {progress}%
    </Button>
  )
}

const Files = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return <input type="file" onChange={onChange} />
}
