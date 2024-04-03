import { CreateJsxElement } from ".."
import { HtmlElements } from "@configs/types"
import { twclx } from "@utils/functions"

interface Props extends React.HTMLAttributes<HTMLElement> {
  as: HtmlElements
  className: string
  children: React.ReactNode
  ref: React.RefObject<HTMLElement>
}

export const Box = ({ as, children, className, ref, ...props }: Partial<Props>) => {
  return (
    <CreateJsxElement
      {...props}
      as={as}
      ref={ref}
      className={twclx("p-3 rounded-medium border border-default-300", className)}>
      {children}
    </CreateJsxElement>
  )
}
