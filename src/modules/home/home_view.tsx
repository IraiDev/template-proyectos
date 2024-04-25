import { apiTest } from "@config/api"
import { ContentType } from "@config/emuns"
import { Button } from "@modules/core/components"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { Helmet } from "react-helmet"

export const HomeView = () => {
  const [progress, setProgress] = useState(0)

  const queryClient = useQueryClient()
  const {
    data = [],
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const resp = await apiTest("/posts", {
        fileName: "x",
      })
      const posts = await resp.json()

      return posts
    },
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
    },
    onError: (e) => {
      alert(e)
      setProgress(0)
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
        <span>Progreso: {progress}</span>
        <Button onClick={() => fileMutation.mutate(null)}>Mutacion</Button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      <Helmet>
        <title>Inicio</title>
      </Helmet>
    </div>
  )
}
