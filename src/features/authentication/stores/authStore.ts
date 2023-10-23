import { create } from "zustand"
import { apiErrorMessage } from "@configs/api"
import { sleep } from "@utils/functions.util"
import { removeAuthTokenFromLocalStorage } from "@utils/localStorage.util"

type Renew = Pick<AsyncStoreController, "successFn" | "errorFn">
type Logout = Pick<AsyncStoreController, "successFn">

interface State {
  authentication: AuthStates
}

interface Actions {
  login(props: AsyncStoreController): void
  renew(props: Renew): void
  logout(props: Logout): void
}

const initialState: State = {
  authentication: "NOT-AUTHENTICATED",
}

export const useAuthStore = create<State & Actions>((set) => ({
  ...initialState,
  login: async ({ successFn, finallyFn, errorFn }) => {
    try {
      await sleep()
      successFn?.({ ok: true, message: "mensaje aqui" })

      set({ authentication: "AUTHENTICATED" })
    } catch (error) {
      const message = apiErrorMessage(error)
      errorFn?.(message)
    } finally {
      finallyFn?.()
    }
  },
  renew: async ({ successFn, errorFn }: Renew) => {
    try {
      set({ authentication: "VALIDATING" })

      await sleep()
      successFn?.({ ok: true, message: "mensaje aqui" })

      set({ authentication: "AUTHENTICATED" })
    } catch (error) {
      const message = apiErrorMessage(error)
      errorFn?.(message)
    }
  },
  logout: ({ successFn }: Logout) => {
    set(initialState)
    removeAuthTokenFromLocalStorage()
    successFn?.({ message: "Sesión cerrada", ok: true })
  },
}))
