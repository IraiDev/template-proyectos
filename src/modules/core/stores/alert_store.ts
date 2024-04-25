import { create } from "zustand"
import { ModalSize } from "../../../config/types"

type State = {
  title: string
  isOpen: boolean
  size?: ModalSize
  hideActions?: boolean
  children: React.ReactNode
  confirm?: Partial<{
    label: string
    action(): void
    isHidden: boolean
  }>
  cancel?: Partial<{
    label: string
    action(): void
    isHidden: boolean
  }>
}

type Actions = {
  createAlert(options: State): void
  onCancel(): void
  onConfirm(): void
}

const init: State = {
  size: "sm",
  isOpen: false,
  title: "Alerta",
  hideActions: false,
  children: undefined,
  cancel: {
    action: undefined,
    isHidden: false,
    label: "Cancelar",
  },
  confirm: {
    action: undefined,
    isHidden: false,
    label: "Aceptar",
  },
}

export const alertStore = create<State & Actions>((set, get) => ({
  ...init,
  createAlert: (options) => {
    set(options)
  },
  onConfirm: () => {
    get().confirm?.action?.()
    set({ ...init, isOpen: false })
  },
  onCancel: () => {
    get().cancel?.action?.()
    set({ ...init, isOpen: false })
  },
}))
