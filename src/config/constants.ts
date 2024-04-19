import { InputProps } from "@nextui-org/react"

export const {
  VITE_API_BASE_URL: API_BASE_URL = "",
  VITE_TOKEN_KEY: TOKEN_KEY = "",
} = import.meta.env

export const LOCAL_STORAGE_KEYS = {
  TOKEN_KEY,
  TEST: "TEST",
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

export const NEXT_UI_DEFAULT_STYLES_PROPS: Pick<
  InputProps,
  "size" | "radius" | "variant"
> = {
  size: "sm",
  radius: "sm",
  variant: "flat",
}
