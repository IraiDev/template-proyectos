import React from "react"
import { ButtonProps, Button as NextButton, cn } from "@nextui-org/react"

export const Button = React.forwardRef(function (
  props: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <NextButton
      ref={ref}
      variant="shadow"
      size="md"
      type="button"
      radius="lg"
      {...props}
      className={cn("font-semibold focus-visible:!outline-primary", props.className)}
    />
  )
})
