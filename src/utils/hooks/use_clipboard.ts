import { useToast } from "."

export function useClipboard() {
  const { infoToast, warningToast } = useToast()

  const handleSaveInClipboard = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(function () {
        infoToast("Copiado al portapapeles")
      })
      .catch(function (error) {
        console.log(error)
        warningToast("Error al copiar en portapapeles")
      })
  }

  return {
    handleSaveInClipboard,
  }
}
