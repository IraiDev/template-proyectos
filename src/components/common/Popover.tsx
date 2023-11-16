import React from "react"
import { Popover as NextPopover, PopoverProps } from "@nextui-org/react"

export const Popover = React.forwardRef(function (
  props: PopoverProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return <NextPopover ref={ref} showArrow backdrop="opaque" placement="left" {...props} />
})
