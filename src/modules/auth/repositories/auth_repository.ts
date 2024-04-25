import { routes } from "@router/routes"
import { sleep } from "@utils/helpers"
import { LocalStorage } from "@utils/local_storage"
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
  private localStorage = new LocalStorage("TOKEN_KEY")

  async login(payload: AuthPayload): AuthResponse {
    await sleep(0.5)
    console.log({ payload })
    this.localStorage.save("")

    return {
      user: null,
      isSignIn: true,
      redirecUrl: `/${routes.private.home}`,
    }
  }

  async renew(): AuthResponse {
    await sleep()
    this.localStorage.save("")

    return {
      user: null,
      isSignIn: true,
      redirecUrl: `/${routes.private.home}`,
    }
  }

  logout(): void {
    this.localStorage.remove()
  }
}
