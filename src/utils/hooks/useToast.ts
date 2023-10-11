import { useCallback } from "react"
import { toast } from "react-toastify"

const DEFAULT_SECONDS = 6

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

  const apiResponseToast = useCallback(({ message, ok }: HttpResponse) => {
    if (ok) {
      toast.success(message)
      return
    }
    toast.warning(message, { autoClose: DEFAULT_SECONDS * 1000 })
  }, [])

  return {
    infoToast,
    errorToast,
    successToast,
    warningToast,
    apiResponseToast,
  }
}
