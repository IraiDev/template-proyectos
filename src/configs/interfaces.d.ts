interface HttpResponse {
  ok: boolean
  message: string
}

interface HttpResponseWithData extends HttpResponse {
  data: any
}

interface Column {
  key: string
  content: string
  align: Align
  width?: number
  hidden?: boolean
  sticky?: boolean
}

interface Option {
  label: string
  key: string
}

interface AsyncStoreController {
  successFn?(props: HttpResponse): void
  errorFn?(message: string): void
  finallyFn?(): void
}
