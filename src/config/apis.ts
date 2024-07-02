import { API_BASE_URL } from "@config/constants"
import { fetcher } from "@helpers/fetcher"

export const api = fetcher(API_BASE_URL)
