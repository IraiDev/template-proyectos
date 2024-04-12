import { ButtonProps, Button as NextButton } from "@nextui-org/react"
import { twclx } from "@utils/tailwind"
import React from "react"

type Props = {
  ref?: React.RefObject<HTMLButtonElement>
} & Omit<ButtonProps, "ref">

export function Button({ ref, className, ...props }: Props) {
  return (
    <NextButton
      ref={ref}
      size="sm"
      type="button"
      variant="solid"
      color="primary"
      className={twclx("font-semibold", className)}
      {...props}
    />
  )
}
