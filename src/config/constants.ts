import { InputProps } from "@nextui-org/react"

export const {
  VITE_API_BASE_URL: API_BASE_URL = "",
  VITE_TOKEN_KEY: TOKEN_KEY = "token-provisorio",
  VITE_VERSION_WEB: VERSION_WEB = "",
  VITE_LAST_VISITED_URL: LAST_VISITED_URL = "",
  VITE_TIPO: TIPO = "",
} = import.meta.env

export const LOCAL_STORAGE_KEYS = {
  TOKEN_KEY,
  LAST_VISITED_URL,
}

export const SEARCH_PARAMS = {
  PAGE: { KEY: "pagina", DEFAULT_VALUE: "1" },
  LIMIT: { KEY: "limite", DEFAULT_VALUE: "10" },
}

export const CONSTANTS = {
  TOKEN_REQUIRED: "TokenRequired",
}

export const ICON_SIZE = {
  DEFAULT: 18,
  XL: 26,
  LG: 22,
  MD: 18,
  SM: 14,
  XS: 10,
}

export const NEXT_UI_DEFAULT_STYLES_PROPS: Pick<InputProps, "size" | "radius" | "variant"> = {
  size: "sm",
  radius: "sm",
  variant: "flat",
}

export const DATE_FORMATS = {
  amd: "YYYY-MM-DD",
  dma: "DD-MM-YYYY",
  amdh: "YYYY-MM-DD",
  dmah: "DD-MM-YYYY hh:mm",
  dmonth: "DD MMM",
  time_24: "HH:mm",
  time_12: "hh:mm",
  yy: "YY",
  yyyy: "YYYY",
  mm: "MM",
  mmmm: "MMMM",
  dd: "DD",
  dddd: "DDDD",
  hhmm: "hh:mm",
  ddddmmmYYYY: "dddd, D MMMM YYYY",
}
