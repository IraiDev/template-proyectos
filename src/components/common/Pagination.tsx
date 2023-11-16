import React from "react"
import { Pagination as NextPagination, PaginationProps } from "@nextui-org/react"

export const Pagination = React.forwardRef(function (
  props: PaginationProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <NextPagination
      ref={ref}
      size="md"
      isCompact
      showShadow
      showControls
      initialPage={1}
      {...props}
    />
  )
})
