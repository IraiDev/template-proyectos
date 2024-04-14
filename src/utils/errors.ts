import { ERROR_MESSAGE } from "@config/messages"

const { UNEXPECTED_ERROR, SERVER_ERROR } = ERROR_MESSAGE

export function logError(error: unknown, where: string) {
  console.error(`ERROR EN ${where.toLocaleUpperCase()} (CATCH): `, error)
}

export function getErrorMessage(error: unknown) {
  const { message } = error as { message: string; stack: string }

  return message ?? UNEXPECTED_ERROR
}

export function apiErrorHandler(status: number, message: string) {
  if (status >= 500) {
    throw new Error(message || SERVER_ERROR)
  }

  if (status < 200 || status > 299) {
    throw new Error(message || UNEXPECTED_ERROR)
  }
}
