import { Chip as NextChip, ChipProps } from "@nextui-org/react"
import React from "react"

type Props = {
  ref?: React.RefObject<HTMLDivElement>
} & Omit<ChipProps, "ref">

export function Chip({ ref, ...props }: Props) {
  return (
    <NextChip
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
