import { Pagination as NextPagination, PaginationProps, extendVariants } from "@nextui-org/react"

export function Pagination(props: PaginationProps) {
  return <MyPagination {...props} />
}

const MyPagination = extendVariants(NextPagination, {
  defaultVariants: {
    size: "md",
    isCompact: "true",
    showControls: "true",
    initialPage: 1,
    showShadow: "true",
  },
})
