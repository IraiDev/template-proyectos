interface HttpResponse {
  ok: boolean
  message: string
}

interface HttpResponseData extends HttpResponse {
  data: any
}

interface Column {
  key: string
  content: string
  align: Align
}
