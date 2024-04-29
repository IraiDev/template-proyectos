import { useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { AuthRepository } from "../repositories/auth_repository"
import { authStore } from "../stores/auth_store"
import { getErrorMessage } from "@utils/errors"
import { useToast } from "@modules/core/hooks/use_toast"
import { useFields } from "@modules/core/hooks/use_fields"
import { AuthPayload, authSchema } from "../models/auth"

const auth = new AuthRepository()

export function useAuth() {
  const [user, isSignIn] = authStore((state) => [state.user, state.isSignIn])
  const [setUser, setSignIn] = authStore((state) => [
    state.setUser,
    state.setSignIn,
  ])

  const [isLoginLoading, setIsLoadingLogin] = useState(false)
  const { errorToast } = useToast()
  const navigate = useNavigate()

  const { field, handleSubmit, reset } = useFields<AuthPayload>({
    validation: authSchema,
    defaultValues: {
      correo: "",
      contrasena: "",
    },
  })

  const onLogin: SubmitHandler<AuthPayload> = async (values) => {
    try {
      setIsLoadingLogin(true)

      const { isSignIn, redirecUrl, user: logedUser } = await auth.login(values)

      console.log({ isSignIn, redirecUrl, logedUser })
      navigate(redirecUrl, { replace: isSignIn })
      setSignIn(isSignIn)
      setUser(logedUser)
      reset()
    } catch (e) {
      const errorMessage = getErrorMessage(e)
      errorToast(errorMessage)
    } finally {
      setIsLoadingLogin(false)
    }
  }

  const handleLogin = handleSubmit(onLogin)

  const handleLogout = () => {
    auth.logout()
    setSignIn(false)
    setUser(null)
  }

  return {
    user,
    field,
    isSignIn,
    handleLogin,
    handleLogout,
    isLoginLoading,
  }
}
