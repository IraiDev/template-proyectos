import { HttpResponse } from "../config/interfaces"
export function sleep(seconds?: number): Promise<boolean> {
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

export function trimEntries<T extends object>(entry: T) {
  const output: Record<string, any> = {}

  for (const [key, value] of Object.entries(entry)) {
    if (typeof value === "string") {
      output[key] = value.trim()
    } else {
      output[key] = value
    }
  }

  return output as T
}

export function toString(input: any): string {
  const output = typeof input === "string" ? input : JSON.stringify(input)
  return output
}

export function genericResponseAdapter(response: any): HttpResponse {
  return {
    ok: response?.ok ?? false,
    message: response?.message ?? "Error Generico",
  }
}
