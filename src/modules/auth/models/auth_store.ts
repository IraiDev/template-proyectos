import { UserModel } from "./user"

export type AuthStateStore = {
  user: UserModel | null
  isAuthenticated: boolean
}

export type AuthActionStore = {
  setSignIn(value: AuthStateStore["isAuthenticated"]): void
  setUser(user: AuthStateStore["user"]): void
}
