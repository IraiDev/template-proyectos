import { ButtonProps, Button as NextButton } from "@nextui-org/react"
import { twclx } from "src/helpers/tailwind"
import React from "react"
import { To } from "react-router-dom"

type Props = {
  ref?: React.RefObject<HTMLButtonElement>
  replace?: boolean
  to?: To
} & Omit<ButtonProps, "ref">

const Button = ({ ref, className, ...props }: Props) => {
  return (
    <NextButton
      ref={ref}
      size="sm"
      type="button"
      variant="solid"
      color="primary"
      className={twclx("font-bold", className)}
      {...props}
    />
  )
}

export default Button
