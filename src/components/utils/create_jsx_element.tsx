import { HtmlElements } from "@configs/types"
import { createElement } from "react"

interface Props extends React.HTMLAttributes<HTMLElement> {
  ref: React.RefObject<HTMLElement>
  children: React.ReactNode
  className: string
  as: HtmlElements
}

export function CreateJsxElement({ as = "div", children, ...props }: Partial<Props>) {
  return createElement(as, props, children)
}
