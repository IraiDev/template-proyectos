import React from "react"
import { TextAreaProps, Textarea as NextTextarea } from "@nextui-org/react"

export const Textarea = React.forwardRef(function (
  { classNames, ...props }: TextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <NextTextarea
      ref={ref}
      size="md"
      radius="lg"
      variant="flat"
      placeholder=" "
      labelPlacement="outside"
      classNames={{
        inputWrapper:
          "!ring-primary border border-transparent bg-default-100 hover:bg-default-200 focus-within:!border-default-300 !shadow-none transition-colors",
        innerWrapper: "mb-0 pb-0",
        input: "!text-opacity-70 placeholder:!text-opacity-40",
        label: "first-letter:uppercase font-semibold !text-default-950",
        ...classNames,
      }}
      {...props}
    />
  )
})
