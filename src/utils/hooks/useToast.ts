import { useCallback } from "react"
import { toast } from "react-toastify"

const DEFAULT_SECONDS = 6

interface Config {
  pending?: string
  success?: string
  error?: string
}

const defaultConfig: Config = {
  pending: "Cargando...",
  success: "Descargado con exito",
  error: "Error en la descarga",
}

export function useToast() {
  const successToast = useCallback((message: string) => {
    toast.success(message)
  }, [])

  const infoToast = useCallback((message: string) => {
    toast.info(message)
  }, [])

  const warningToast = useCallback(
    (message: string, seconds: number | undefined = DEFAULT_SECONDS) => {
      toast.warning(message, { autoClose: seconds * 1000 })
    },
    [],
  )

  const errorToast = useCallback(
    (message: string, seconds: number | undefined = DEFAULT_SECONDS) => {
      toast.error(message, { autoClose: seconds * 1000 })
    },
    [],
  )

  const loadingToast = useCallback(
    <T>(promise: Promise<T>, config: Config | undefined = defaultConfig): Promise<T> => {
      return toast.promise(promise, config)
    },
    [],
  )

  return {
    infoToast,
    errorToast,
    successToast,
    warningToast,
    loadingToast,
  }
}
