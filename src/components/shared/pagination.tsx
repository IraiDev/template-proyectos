import { Pagination as NextPagination, PaginationProps } from "@nextui-org/react"
import React from "react"

interface Props extends Omit<PaginationProps, "ref"> {
  ref?: React.RefObject<HTMLDivElement>
}

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
