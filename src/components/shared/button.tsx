import { Button as NextButton, ButtonProps, cn } from "@nextui-org/react"
import React from "react"

interface Props extends Omit<ButtonProps, "ref"> {
  ref?: React.RefObject<HTMLButtonElement>
}

export function Button({ ref, className, ...props }: Props) {
  return (
    <NextButton
      ref={ref}
      size="sm"
      type="button"
      variant="solid"
      color="primary"
      className={cn("font-semibold focus-visible:!outline-primary", className)}
      {...props}
    />
  )
}
