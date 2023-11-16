import { Popover as NextPopover, extendVariants } from "@nextui-org/react"

export const Popover = extendVariants(NextPopover, {
  defaultVariants: {
    backdrop: "opaque",
    placement: "left",
    showArrow: "true",
  },
})
