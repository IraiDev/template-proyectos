import { Chip as NextChip, extendVariants } from "@nextui-org/react"

export const Chip = extendVariants(NextChip, {
  defaultVariants: {
    variant: "flat",
    size: "sm",
  },
})
