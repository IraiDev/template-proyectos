import React from "react"
import { Chip as NextChip, ChipProps } from "@nextui-org/react"

export const Chip = React.forwardRef(function (
  props: ChipProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return <NextChip ref={ref} variant="flat" size="sm" {...props} />
})
