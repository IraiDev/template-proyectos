import {
  extendVariants,
  Modal as NextModal,
  ModalProps,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react"

interface Props extends Omit<ModalProps, "children" | "title" | "as"> {
  children: React.ReactNode
  title: string
  as?: keyof JSX.IntrinsicElements
  onSubmit?(e: React.FormEvent): void
}

export function Modal({ title, children, as = "div", onSubmit, ...props }: Props) {
  return (
    <MyModal {...props}>
      <ModalContent as={as} onSubmit={onSubmit}>
        <ModalHeader className="text-2xl font-bold">{title}</ModalHeader>
        {children}
      </ModalContent>
    </MyModal>
  )
}

const MyModal = extendVariants(NextModal, {
  defaultVariants: {
    size: "lg",
    backdrop: "opaque",
    scrollBehavior: "inside",
    placement: "top",
    isKeyboardDismissDisabled: "true",
    shouldBlockScroll: "true",
    isDismissable: "false",
  },
})
