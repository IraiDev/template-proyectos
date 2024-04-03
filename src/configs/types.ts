export type Size = "lg" | "md" | "sm" | "xs"
export type Align = "center" | "left" | "right"
export type Valign = "middle" | "top" | "bottom"
export type HtmlElements = keyof JSX.IntrinsicElements
export type KeyDownEvent<T> = React.KeyboardEvent<T> | KeyboardEvent
export type InputOnlyNumberEntryType = "positive" | "negative" | "both"
export type InputType = "date" | "checkbox" | "time" | "text" | "password"
export type ModalSize = "full" | "5xl" | "4xl" | "3xl" | "2xl" | "xl" | Size
