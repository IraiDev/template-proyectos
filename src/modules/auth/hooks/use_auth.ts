import { useFields } from "@modules/core/hooks/use_fields"
import { useToast } from "@modules/core/hooks/use_toast"
import { useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "src/helpers/errors"
import { create } from "zustand"
import { AuthPayload, authSchema } from "../models/auth"
import { AuthActionStore, AuthStateStore } from "../models/auth_store"
import { AuthRepository } from "../repositories/auth_repository"

const auth = new AuthRepository()

export function useAuth() {
  const [user, isAuthenticated] = authStore((state) => [
    state.user,
    state.isAuthenticated,
  ])
  const [setUser, setSignIn] = authStore((state) => [
    state.setUser,
    state.setSignIn,
  ])

  const [isSigningIn, setIsSigningIn] = useState(false)
  const { errorToast } = useToast()
  const navigate = useNavigate()

  const { field, handleSubmit, reset } = useFields<AuthPayload>({
    validation: authSchema,
    defaultValues: {
      correo: "",
      contrasena: "",
    },
  })

  const onSignIn: SubmitHandler<AuthPayload> = async (values) => {
    try {
      setIsSigningIn(true)

      const { isSignIn, redirecUrl, user: logedUser } = await auth.login(values)

      navigate(redirecUrl, { replace: isSignIn })
      setSignIn(isSignIn)
      setUser(logedUser)
      reset()
    } catch (e) {
      const errorMessage = getErrorMessage(e)
      errorToast(errorMessage)
    } finally {
      setIsSigningIn(false)
    }
  }

  const handleLogin = handleSubmit(onSignIn)

  const handleLogout = () => {
    auth.logout()
    setSignIn(false)
    setUser(null)
  }

  return {
    user,
    field,
    handleLogin,
    isSigningIn,
    handleLogout,
    isAuthenticated,
  }
}

const authStore = create<AuthStateStore & AuthActionStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setSignIn: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
}))
