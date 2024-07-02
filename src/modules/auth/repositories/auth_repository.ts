import { routes } from "@router/routes"
import { sleep } from "@helpers/helpers"
import { LocalStorage } from "@helpers/local_storage"
import { UserModel } from "../models/user"
import { AuthPayload } from "../models/auth"

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

const token = new LocalStorage("TOKEN_KEY")

export class AuthRepository implements Repository {
  hasSession() {
    return token.exists()
  }

  async login(payload: AuthPayload): AuthResponse {
    await sleep(0.5)
    console.log({ payload })
    token.save("")

    return {
      user: null,
      isSignIn: true,
      redirecUrl: `/${routes.private.home}`,
    }
  }

  async renew(): AuthResponse {
    await sleep()
    token.save("")

    return {
      user: null,
      isSignIn: true,
      redirecUrl: `/${routes.private.home}`,
    }
  }

  logout(): void {
    token.remove()
  }
}
