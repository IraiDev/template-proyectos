import dayjs, { UnitType } from "dayjs"

const DATE_FORMATS = {
  amd: "YYYY-MM-DD",
  dma: "DD-MM-YYYY",
  amdh: "YYYY-MM-DD",
  dmah: "DD-MM-YYYY",
  dmonth: "DD MMM",
  time_24: "hh:mm A",
  time_12: "hh:mm",
  yy: "YY",
  yyyy: "YYYY",
  mm: "MM",
  mmmm: "MMMM",
  dd: "DD",
  dddd: "DDDD",
}

export function isDateValid(input: any) {
  return dayjs(input).isValid()
}

export function formatDate(props?: FormatDate): string {
  if (props === undefined) {
    return dayjs().format(DATE_FORMATS.dma)
  }

  const {
    format = "amd",
    date = undefined,
    invalidMessage = "Fecha invalida",
  } = props
  const isValid = isDateValid(date)

  return isValid ? invalidMessage : dayjs(date).format(DATE_FORMATS[format])
}

export function dateDiff({ start, end, unit = "hours", float = false }: DateDiff) {
  return dayjs(end).diff(start, unit, float)
}

type FormatDate = Partial<{
  date: any
  invalidMessage: string
  format: keyof typeof DATE_FORMATS
}>

type DateDiff = {
  end: string
  start: string
  float?: boolean
  unit?: UnitType
}
