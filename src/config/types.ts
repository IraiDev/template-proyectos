import { ZodTypeAny } from "zod"
import { DATE_FORMATS, LOCAL_STORAGE_KEYS } from "./constants"
import { ChangeEvent as CE } from "react"

export type Size = "lg" | "md" | "sm" | "xs"
export type Align = "center" | "left" | "right"
export type Valign = "middle" | "top" | "bottom"
export type DateFormats = keyof typeof DATE_FORMATS
export type HtmlElements = keyof JSX.IntrinsicElements
export type LocalStorageKeys = keyof typeof LOCAL_STORAGE_KEYS
export type HandleFormEvent = React.FormEvent<HTMLFormElement>
export type KeyDownEvent<T> = React.KeyboardEvent<T> | KeyboardEvent
export type InputOnlyNumberEntryType =
  | "positive"
  | "negative"
  | "both"
export type InputType =
  | "date"
  | "checkbox"
  | "time"
  | "text"
  | "password"
export type ZodRecordSchema<T extends object> = Record<
  keyof T,
  ZodTypeAny
>
export type ModalSize =
  | "full"
  | "5xl"
  | "4xl"
  | "3xl"
  | "2xl"
  | "xl"
  | Size
export type FieldEventHandler<T> = (
  fn?: (e: CE<T>) => void,
) => (e: CE<T>) => void
export type SpecialFieldEventHandler<T = any> = (
  fn?: (d: T) => void,
) => (d: T) => void
