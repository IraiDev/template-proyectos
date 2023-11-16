import { createElement } from "react"
import { twMerge } from "tailwind-merge"

interface Props extends React.HTMLAttributes<HTMLElement> {
  as: keyof JSX.IntrinsicElements
  children: React.ReactNode
  className: string
}

export function Box({ as = "div", children, className, ...props }: Partial<Props>) {
  return createElement(
    as,
    {
      className: twMerge(
        "bg-background-50 p-4 rounded-large shadow-lg shadow-background-700/10",
        className,
      ),
      props,
    },
    children,
  )
}
