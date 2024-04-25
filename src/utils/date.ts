import { DATE_FORMATS } from "@config/constants"
import { DateFormats } from "@config/types"
import dayjs, { UnitType } from "dayjs"
import "dayjs/locale/es"

dayjs.locale("es")

type FormatDate = Partial<{
  date: any
  format: DateFormats
  invalidMessage: string
}>

type DateDiff = {
  value?: string
  compare: string
  float?: boolean
  unit?: UnitType
}

export class MyDate {
  constructor(
    private readonly init: Date | string | number | undefined = new Date(),
  ) {}

  private invalidDateError(value: any, compare: any) {
    if (!this.isValid(value)) {
      throw new Error('Fecha ingresada "value" es invalida')
    }

    if (!this.isValid(compare)) {
      throw new Error('Fecha ingresada "compare" es invalida')
    }
  }

  format(props?: FormatDate) {
    if (props === undefined) {
      return dayjs(this.init).format(DATE_FORMATS.amd)
    }

    const {
      format = "amd",
      date = undefined,
      invalidMessage = "Fecha invalida",
    } = props
    const isValid = this.isValid(date)

    return isValid
      ? dayjs(date ?? this.init).format(DATE_FORMATS[format])
      : invalidMessage
  }

  isValid(input: any) {
    return dayjs(input).isValid()
  }

  diff({ compare, value, unit = "hours", float = false }: DateDiff) {
    this.invalidDateError(value, compare)

    return dayjs(value ?? this.init).diff(compare, unit, float)
  }

  isAfter(compare: any, value?: any) {
    this.invalidDateError(value, compare)

    return dayjs(
      this.format({ date: value ?? this.init, format: "amdh" }),
    ).isAfter(compare)
  }

  isBefore(compare: any, value?: any) {
    this.invalidDateError(value, compare)

    return dayjs(
      this.format({ date: value ?? this.init, format: "amdh" }),
    ).isBefore(compare)
  }

  now(format?: DateFormats) {
    return this.format({ format })
  }

  asDate(date: string) {
    return dayjs(date).date()
  }
}
