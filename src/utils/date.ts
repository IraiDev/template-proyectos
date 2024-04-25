import { DATE_FORMATS } from "@config/constants"
import { DateFormats } from "@config/types"
import dayjs, { UnitType } from "dayjs"
import "dayjs/locale/es"

dayjs.locale("es")

export function isDateValid(input: any) {
  return dayjs(input).isValid()
}

export function formatDate(props?: FormatDate): string {
  if (props === undefined) {
    return dayjs().format(DATE_FORMATS.dma)
  }

  const { format = "amd", date = undefined, invalidMessage = "Fecha invalida" } = props
  const isValid = isDateValid(date)

  return isValid ? dayjs(date).format(DATE_FORMATS[format]) : invalidMessage
}

export function dateDiff({ start, end, unit = "hours", float = false }: DateDiff) {
  return dayjs(end).diff(start, unit, float)
}

type FormatDate = Partial<{
  date: any
  invalidMessage: string
  format: DateFormats
}>

type DateDiff = {
  end: string
  start: string
  float?: boolean
  unit?: UnitType
}
