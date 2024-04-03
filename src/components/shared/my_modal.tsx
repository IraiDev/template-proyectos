import React from "react"
import { Modal, ModalProps, ModalContent, ModalHeader } from "@nextui-org/react"

interface Props extends Omit<ModalProps, "title" | "as" | "ref"> {
  ref?: React.RefObject<HTMLDivElement>
  hideHeader?: boolean
  title: React.ReactNode
}

export function MyModal({
  ref,
  title,
  children,
  size = "xl",
  hideHeader = false,
  isDismissable = false,
  hideCloseButton = false,
  ...props
}: Props) {
  return (
    <Modal
      ref={ref}
      size={size}
      backdrop="opaque"
      shouldBlockScroll
      placement="top-center"
      scrollBehavior="inside"
      isKeyboardDismissDisabled
      isDismissable={isDismissable}
      hideCloseButton={hideCloseButton || hideHeader}
      {...props}>
      <ModalContent>
        {hideHeader && <ModalHeader className="text-2xl font-semibold">{title}</ModalHeader>}
        {children}
      </ModalContent>
    </Modal>
  )
}
