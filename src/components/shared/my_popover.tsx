import { Popover, PopoverProps } from "@nextui-org/react"
import React from "react"

interface Props extends Omit<PopoverProps, "ref"> {
  ref?: React.RefObject<HTMLDivElement>
}

export function MyPopover({ ref, ...props }: Props) {
  return (
    <Popover ref={ref} size="sm" showArrow backdrop="opaque" placement="bottom-end" {...props} />
  )
}
