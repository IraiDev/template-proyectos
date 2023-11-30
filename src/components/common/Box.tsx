import { cn } from "@nextui-org/react"
import { createElement } from "react"

interface Props extends React.HTMLAttributes<HTMLElement> {
  ref: React.RefObject<HTMLElement>
  as: keyof JSX.IntrinsicElements
  children: React.ReactNode
  className: string
}

export function Box({ as = "div", children, className, ...props }: Partial<Props>) {
  return createElement(
    as,
    {
      className: cn(
        "bg-background-50 p-4 rounded-large shadow-lg shadow-background-700/10",
        className,
      ),
      ...props,
    },
    children,
  )
}
