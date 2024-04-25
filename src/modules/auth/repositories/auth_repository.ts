import { sleep } from "@utils/utils"
import { AuthPayload, UserModel } from "../models"
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveInLocalStorage,
} from "@utils/local_storage"
import { routes } from "@router/routes"

type Response = Promise<{ user: UserModel; isSignIn: boolean; redirecUrl: string }>

interface Repository {
  login(payload: AuthPayload): Response
  renew(): Response
  logout(): void
}

export class AuthRepository implements Repository {
  async login(payload: AuthPayload): Response {
    const result = await sleep(1)

    saveInLocalStorage("TOKEN_KEY", payload.usuario)

    return {
      isSignIn: result,
      user: payload.usuario,
      redirecUrl: result ? `/${routes.private.home}` : "",
    }
  }
  async renew(): Response {
    const result = await sleep(1)
    const user = getFromLocalStorage("TOKEN_KEY")

    return {
      user,
      isSignIn: result,
      redirecUrl: result ? `/${routes.private.home}` : `/${routes.public.login}`,
    }
  }
  logout(): void {
    removeFromLocalStorage("TOKEN_KEY")
  }
}
