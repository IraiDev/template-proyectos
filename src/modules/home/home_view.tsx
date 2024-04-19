import { apiTest } from "@config/api"
import { ContentType } from "@config/emuns"
import { Button } from "@modules/core/components"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import axios from "axios"

interface Todo {
  userId: number
  id: number
  title: string
  body: string
}

async function getTodos(limit?: number) {
  const response = await apiTest(`/posts?limit=${limit}`, {
    fileName: "home_view.tsx",
  })
  const data = (await response.json()) as Todo[]

  return data
}

async function createTodo(payload: { title: string; body: string; userId: number }) {
  const response = await apiTest("/posts", {
    fileName: "home_view.tsx",
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })

  const todo = (await response.json()) as Todo

  return todo
}

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
        <ButtonNew progress={progress} />
      </div>
      <ul>
        {data.map((el, idx) => (
          <li key={el.id}>
            {idx + 1}- <span>{el.title}</span>
          </li>
        ))}
      </ul>
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
