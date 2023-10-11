import { create } from "zustand"
import { apiErrorMessage } from "@configs/api"
import { sleep } from "@utils/funcitons.util"
import { removeAuthToken } from "@utils/localStorage.util"

interface Login {
  successFn?(props: HttpResponse): void
  errorFn?(message: string): void
  finallyFn?(): void
}

type Renew = Pick<Login, "successFn" | "errorFn">
type Logout = Pick<Login, "successFn">

interface State {
  authentication: AuthStates
}

interface Actions {
  login(props: Login): void
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
    removeAuthToken()
    successFn?.({ message: "Sesión cerrada", ok: true })
  },
}))
