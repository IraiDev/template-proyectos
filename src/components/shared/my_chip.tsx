import { Chip, ChipProps } from "@nextui-org/react"
import React from "react"

interface Props extends Omit<ChipProps, "ref"> {
  ref?: React.RefObject<HTMLDivElement>
}

export function MyChip({ ref, ...props }: Props) {
  return (
    <Chip
      ref={ref}
      size="sm"
      radius="sm"
      variant="flat"
      color="primary"
      classNames={{ content: "font-semibold" }}
      {...props}
    />
  )
}
