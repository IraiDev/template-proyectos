import { HtmlElements } from "@config/types"
import { twclx } from "src/helpers/tailwind"
import CreateJsxElement from "../utils/create_jsx_element"

type Props = {
  as: HtmlElements
  className: string
  children: React.ReactNode
  ref: React.RefObject<HTMLElement>
} & React.HTMLAttributes<HTMLElement>

const Box = ({ as, children, className, ref, ...props }: Partial<Props>) => {
  return (
    <CreateJsxElement
      {...props}
      as={as}
      ref={ref}
      className={twclx(
        "p-3 rounded-medium border border-default-300",
        className,
      )}
    >
      {children}
    </CreateJsxElement>
  )
}

export default Box
