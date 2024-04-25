import { ERROR_MESSAGE } from "@config/messages"

const { UNEXPECTED_ERROR, SERVER_ERROR } = ERROR_MESSAGE

export function logError(error: unknown, where: string) {
  console.error(`ERROR EN ${where.toLocaleUpperCase()} (CATCH): `, error)
}

export function getErrorMessage(error: unknown) {
  const { message } = error as { message: string; stack: string }

  if (error instanceof DOMException) {
    return ""
  }

  return message ?? UNEXPECTED_ERROR
}

export function apiErrorHandler(status: number, message: string) {
  if (status >= 500) {
    throw new MyError(message || SERVER_ERROR)
  }

  if (status < 200 || status > 299) {
    throw new MyError(message || UNEXPECTED_ERROR)
  }
}

export class MyError extends Error {
  constructor(public message: string) {
    super(message)
  }
}
