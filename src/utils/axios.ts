import { ERROR_MESSAGE } from "@configs/messages"
import axios, { CancelTokenSource } from "axios"

const { UNEXPECTED_ERROR, REQUEST_CANCELLED } = ERROR_MESSAGE

export type AxiosCancelToken = undefined | CancelTokenSource

export function showApiErrorInLogs(error: unknown, where: string) {
  if (axios.isCancel(error)) return

  console.log(`ERROR EN ${where.toLocaleUpperCase()} (CATCH): `, { error })
}

export function apiErrorHandler(error: unknown) {
  if (axios.isCancel(error)) {
    return REQUEST_CANCELLED
  }

  if (axios.isAxiosError(error)) {
    return error.response?.data.message || UNEXPECTED_ERROR
  }

  return UNEXPECTED_ERROR
}

export const axiosCancelToken = axios.CancelToken
