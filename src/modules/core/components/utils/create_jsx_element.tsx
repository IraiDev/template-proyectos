import { HtmlElements } from "@config/types"
import { createElement } from "react"

type Props = {
  ref: React.RefObject<HTMLElement>
  children: React.ReactNode
  className: string
  as: HtmlElements
} & React.HTMLAttributes<HTMLElement>

const CreateJsxElement = ({
  as = "div",
  children,
  ...props
}: Partial<Props>) => {
  return createElement(as, props, children)
}

export default CreateJsxElement
