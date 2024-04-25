import { create } from "zustand"

type State = {
  isSidebarOpen: boolean
}

type Actions = {
  onToggleSidebarOpen(value?: boolean): void
}

const init: State = {
  isSidebarOpen: false,
}

type Store = State & Actions

export const createUiStore = (initiaProps: Partial<Store>) => {
  const initialState: State = {
    ...init,
    ...initiaProps,
  }

  return create<Store>((set, get) => ({
    ...initialState,
    onToggleSidebarOpen: (value) => {
      set({ isSidebarOpen: value ?? !get().isSidebarOpen })
    },
  }))
}

export const uiStore = createUiStore({ isSidebarOpen: false })
