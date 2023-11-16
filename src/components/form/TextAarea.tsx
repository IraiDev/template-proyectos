import { Textarea, extendVariants } from "@nextui-org/react"

export const MyTextarea = extendVariants(Textarea, {
  defaultVariants: {
    variant: "faded",
    size: "md",
    labelPlacement: "outside",
  },
  slots: {
    label: "capitalize",
  },
})
