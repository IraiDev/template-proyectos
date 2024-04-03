import { InputOnlyNumberEntryType } from "@configs/types"

export function inputOnlyNumber(
  event: any,
  tipoEntrada: InputOnlyNumberEntryType | undefined = "positive",
) {
  const char = event.key

  const value = event.target.value
  const cursorPosition = event.target.selectionStart

  if (tipoEntrada === "positive" && char === "-") {
    event.preventDefault()
  }

  if (tipoEntrada === "negative" && char !== "-" && cursorPosition === 0) {
    event.preventDefault()
  }

  if (
    !/[0-9.-]/.test(char) &&
    char !== "Backspace" &&
    char !== "Delete" &&
    char !== "ArrowLeft" &&
    char !== "ArrowRight" &&
    char !== "Escape" &&
    char !== "Enter" &&
    char !== "Tab"
  ) {
    event.preventDefault()
  }

  if (char === "-" && cursorPosition !== 0) {
    event.preventDefault()
  }

  if (char === "." && cursorPosition === 0) {
    event.preventDefault()
  }

  if (char === "." && value.includes(".")) {
    event.preventDefault()
  }
}

export function sleep(seconds?: number) {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(true)
      },
      (seconds ?? 1) * 1000,
    )
  })
}

export function isEmptyObject<T extends object>(object: T) {
  return Object.keys(object).length === 0
}

export function sanitizeEntries<T extends object>(entry: T) {
  const output: Record<string, string | number | boolean> = {}

  for (const [key, value] of Object.entries(entry)) {
    if (typeof value === "string") {
      output[key] = value.trim()
    } else {
      output[key] = value
    }
  }

  return output as T
}
