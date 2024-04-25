import { API_BASE_URL } from "@config/constants"
import { fetcher } from "@utils/fetcher"

export const api = fetcher(API_BASE_URL)
export const apiTest = fetcher("https://jsonplaceholder.typicode.com")