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
  align: Align
  title: string
  valign: Valign
  content: React.ReactNode
}

export interface Option {
  key: string
  label: string
}
