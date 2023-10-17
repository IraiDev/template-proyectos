import { createElement } from "react"
import { twMerge } from "tailwind-merge"

interface Props {
  as?: keyof JSX.IntrinsicElements
  children?: React.ReactNode
  className?: string
}

export function Box({ as = "div", children, className }: Props) {
  return createElement(
    as,
    {
      className: twMerge(
        "p-5 rounded-large shadow-large bg-default-50 border-2 border-default-200",
        className,
      ),
    },
    children,
  )
}
