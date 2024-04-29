import { Popover as NextPopover, PopoverProps } from "@nextui-org/react"
import React from "react"

type Props = {
  ref?: React.RefObject<HTMLDivElement>
} & Omit<PopoverProps, "ref">

const Popover = ({ ref, ...props }: Props) => {
  return (
    <NextPopover
      ref={ref}
      size="sm"
      showArrow
      backdrop="opaque"
      placement="bottom-end"
      {...props}
    />
  )
}

export default Popover
