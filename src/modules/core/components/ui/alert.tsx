import { alertStore } from "@modules/core/stores/alert_store"
import { ModalBody, ModalFooter } from "@nextui-org/react"
import Modal from "./modal"
import Button from "./button"

const Alert = () => {
  const { title, isOpen, hideActions, children, confirm, cancel, size } =
    alertStore((s) => ({
      size: s.size,
      title: s.title,
      isOpen: s.isOpen,
      hideActions: s.hideActions,
      children: s.children,
      confirm: s.confirm,
      cancel: s.cancel,
    }))
  const [onConfirm, onCancel] = alertStore((s) => [s.onConfirm, s.onCancel])

  return (
    <>
      <Modal
        size={size}
        title={title}
        isOpen={isOpen}
        hideCloseButton
        classNames={{
          body: "p-2 pt-1",
          header: "pt-2 px-3 pb-0 !text-lg",
          footer: "p-2",
        }}
      >
        <ModalBody>{children}</ModalBody>
        {!hideActions && (
          <ModalFooter>
            {!cancel?.isHidden && (
              <Button variant="flat" color="default" onClick={onCancel}>
                {cancel?.label}
              </Button>
            )}
            {!confirm?.isHidden && (
              <Button color="danger" onClick={onConfirm}>
                {confirm?.label}
              </Button>
            )}
          </ModalFooter>
        )}
      </Modal>
    </>
  )
}

export default Alert
