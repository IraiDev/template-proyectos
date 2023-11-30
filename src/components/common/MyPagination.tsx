import { Pagination, PaginationProps } from "@nextui-org/react"
import React from "react"

interface Props extends PaginationProps {
  ref?: React.RefObject<HTMLDivElement>
}

export function MyPagination({ ref, ...props }: Props) {
  return <Pagination ref={ref} size="md" isCompact showShadow showControls {...props} />
}
