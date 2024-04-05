import { ZodTypeAny } from "zod"
import { LOCAL_STORAGE_KEYS } from "./constants"

export type Size = "lg" | "md" | "sm" | "xs"
export type Align = "center" | "left" | "right"
export type Valign = "middle" | "top" | "bottom"
export type HtmlElements = keyof JSX.IntrinsicElements
export type LocalStorageKeys = keyof typeof LOCAL_STORAGE_KEYS
export type TableDataset<T extends object> = T & { key: string }
export type KeyDownEvent<T> = React.KeyboardEvent<T> | KeyboardEvent
export type InputOnlyNumberEntryType = "positive" | "negative" | "both"
export type InputType = "date" | "checkbox" | "time" | "text" | "password"
export type ZodRecordSchema<T extends object> = Record<keyof T, ZodTypeAny>
export type ModalSize = "full" | "5xl" | "4xl" | "3xl" | "2xl" | "xl" | Size
