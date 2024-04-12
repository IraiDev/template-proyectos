import { Pagination as NextPagination, PaginationProps } from "@nextui-org/react"
import React from "react"

type Props = {
  ref?: React.RefObject<HTMLDivElement>
} & Omit<PaginationProps, "ref">

export function Pagination({ ref, ...props }: Props) {
  return (
    <NextPagination
      ref={ref}
      size="sm"
      isCompact
      showShadow
      showControls
      color="primary"
      {...props}
    />
  )
}
