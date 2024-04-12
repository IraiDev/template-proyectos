import React from "react"
import {
  Modal as NextModal,
  ModalProps,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react"

type Props = {
  ref?: React.RefObject<HTMLDivElement>
  hideHeader?: boolean
  title: React.ReactNode
} & Omit<ModalProps, "title" | "as" | "ref">

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
