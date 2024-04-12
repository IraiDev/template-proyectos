import { create } from "zustand"

type State = {
  user: string | null
  isSignIn: boolean
}

type Action = {
  setSignIn(value: State["isSignIn"]): void
  setUser(user: State["user"]): void
}

const init: State = {
  isSignIn: false,
  user: null,
}

export const authStore = create<State & Action>((set) => ({
  ...init,
  setSignIn: (value) => set({ isSignIn: value }),
  setUser: (user) => set({ user }),
}))
