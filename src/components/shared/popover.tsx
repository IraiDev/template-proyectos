import { Popover as NextPopover, PopoverProps } from "@nextui-org/react"
import React from "react"

interface Props extends Omit<PopoverProps, "ref"> {
  ref?: React.RefObject<HTMLDivElement>
}

export function Popover({ ref, ...props }: Props) {
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
