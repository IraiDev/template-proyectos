import { useToast } from "./use_toast"

export function useClipboard() {
  const { infoToast, warningToast } = useToast()

  const handleSaveInClipboard = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        infoToast("Copiado en portapapeles")
      })
      .catch((error) => {
        console.log(error)
        warningToast("Error al copiar en portapapeles")
      })
  }

  return {
    handleSaveInClipboard,
  }
}
