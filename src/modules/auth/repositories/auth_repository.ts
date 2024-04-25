import { routes } from "@router/routes"
import { sleep } from "@utils/helpers"
import { removeFromLocalStorage, saveInLocalStorage } from "@utils/local_storage"
import { AuthPayload, UserModel } from "../models"

type AuthResponse = Promise<{
  user: UserModel | null
  isSignIn: boolean
  redirecUrl: string
}>

interface Repository {
  login(payload: AuthPayload): AuthResponse
  renew(): AuthResponse
  logout(): void
}

export class AuthRepository implements Repository {
  async login(payload: AuthPayload): AuthResponse {
    await sleep(0.5)
    console.log({ payload })
    saveInLocalStorage("TOKEN_KEY", "")

    return {
      user: null,
      isSignIn: true,
      redirecUrl: `/${routes.private.home}`,
    }
  }

  async renew(): AuthResponse {
    await sleep()

    saveInLocalStorage("TOKEN_KEY", "")

    return {
      user: null,
      isSignIn: true,
      redirecUrl: `/${routes.private.home}`,
    }
  }

  logout(): void {
    removeFromLocalStorage("TOKEN_KEY")
  }
}
