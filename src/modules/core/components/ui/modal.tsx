import React from "react"
import {
  Modal as NextModal,
  ModalProps,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react"

interface Props extends Omit<ModalProps, "title" | "as" | "ref"> {
  ref?: React.RefObject<HTMLDivElement>
  hideHeader?: boolean
  title: React.ReactNode
}

export function Modal({
  ref,
  title,
  children,
  hideHeader = false,
  hideCloseButton = false,
  ...props
}: Props) {
  return (
    <NextModal
      ref={ref}
      size="xl"
      backdrop="opaque"
      shouldBlockScroll
      isDismissable={false}
      placement="top-center"
      scrollBehavior="inside"
      isKeyboardDismissDisabled
      hideCloseButton={hideCloseButton || hideHeader}
      {...props}>
      <ModalContent>
        {hideHeader && (
          <ModalHeader className="text-2xl font-semibold">{title}</ModalHeader>
        )}
        {children}
      </ModalContent>
    </NextModal>
  )
}
