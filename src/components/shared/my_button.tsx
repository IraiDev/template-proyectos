import { Button, ButtonProps, cn } from "@nextui-org/react"
import React from "react"

interface Props extends Omit<ButtonProps, "ref"> {
  ref?: React.RefObject<HTMLButtonElement>
}

export function MyButton({ ref, className, ...props }: Props) {
  return (
    <Button
      ref={ref}
      size="sm"
      type="button"
      variant="solid"
      className={cn("font-semibold focus-visible:!outline-primary", className)}
      {...props}
    />
  )
}
