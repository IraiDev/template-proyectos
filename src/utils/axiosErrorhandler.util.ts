import axios from "axios"
import { MESSAGES } from "./constants.util"

const { UNEXPECTED_ERROR } = MESSAGES

export function axiosErrorHandler(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message || UNEXPECTED_ERROR
  }

  return UNEXPECTED_ERROR
}
