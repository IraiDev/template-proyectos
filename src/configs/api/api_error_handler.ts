import { ERROR_MESSAGE } from "@configs/messages"

const { UNEXPECTED_ERROR } = ERROR_MESSAGE

export function apiErrorHandler(status: number, message: string) {
  if (status < 200 && status > 299) {
    throw new Error(message || `${UNEXPECTED_ERROR} ${message}...`)
  }

  if (status >= 500) {
    throw new Error(UNEXPECTED_ERROR)
  }
}
