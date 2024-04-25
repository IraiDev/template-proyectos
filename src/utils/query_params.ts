import { toString } from "./helpers"

type Contructor<T extends object> = {
  searchParams?: URLSearchParams
  schema?: T
}

export class QueryParams<T extends object> {
  private readonly searchParams?: URLSearchParams
  private readonly schema?: T

  constructor(props?: Contructor<T>) {
    this.schema = props?.schema
    this.searchParams = props?.searchParams
  }

  getAll(whitDefaultParams: boolean | undefined = true): URLSearchParams {
    const queryParams = new URLSearchParams(
      whitDefaultParams ? this.searchParams : undefined,
    )

    for (const [key, value] of Object.entries(this.schema ?? {})) {
      value ? queryParams.set(key, toString(value)) : queryParams.delete(key)
    }

    return queryParams
  }

  toObject(): T {
    const obj: any = {}

    for (const [key, value] of this.searchParams?.entries() ?? []) {
      if (obj) {
        obj[key] = value
      }
    }

    return obj as T
  }

  toString(): string {
    const params = new URLSearchParams()

    for (const [key, value] of Object.entries({ ...this.schema } ?? {})) {
      value ? params.set(key, toString(value)) : params.delete(key)
    }

    return params.toString()
  }
}
