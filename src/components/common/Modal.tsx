import React from "react"
import { Modal as NextModal, ModalProps, ModalContent, ModalHeader } from "@nextui-org/react"

interface Props extends Omit<ModalProps, "children" | "title" | "as"> {
  title: string
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  onSubmit?(e: React.FormEvent): void
}

export function Modal({ title, children, as = "div", onSubmit, ...props }: Props) {
  return (
    <CustomModal {...props}>
      <ModalContent as={as} onSubmit={onSubmit}>
        <ModalHeader className="text-2xl font-bold">{title}</ModalHeader>
        {children}
      </ModalContent>
    </CustomModal>
  )
}

const CustomModal = React.forwardRef(function (props: ModalProps, ref: React.ForwardedRef<any>) {
  return (
    <NextModal
      ref={ref}
      shouldBlockScroll
      isKeyboardDismissDisabled
      isDismissable={false}
      size="lg"
      placement="top"
      backdrop="opaque"
      scrollBehavior="inside"
      {...props}
    />
  )
})
