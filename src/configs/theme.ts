import { cn } from "@nextui-org/react"

export const columnAligns: Record<Align, string> = {
  center: "text-center",
  end: "text-right",
  start: "text-left",
}

export const cellAligns: Record<"center" | "left" | "right" | "justify" | "char", string> = {
  center: "text-center",
  char: "text-left",
  justify: "text-left text-justify",
  left: "text-left",
  right: "text-right",
}

export function columnStyles(cols: Column[], index: number, isTh: boolean | undefined = false) {
  return cn(
    cols[index].sticky && "sticky top-0 right-0 z-50",
    isTh ? "bg-default-200" : "bg-white",
    columnAligns[cols[index].align],
  )
}
