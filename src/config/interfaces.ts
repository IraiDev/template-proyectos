import { Align, Valign } from "./types"

export interface HttpResponse {
  ok: boolean
  message: string
}

export interface HttpResponseWithData extends HttpResponse {
  data: any
}

export interface TableColumn {
  key: string
  align?: Align
  title?: string
  width?: number
  valign?: Valign
  content: React.ReactNode
}

export interface Option {
  key: string
  label: string
}

export interface FieldProps {
  onSideEffect?(value: string | boolean): void
  setValueAs?(vlaue: string): string
  id?: string
}