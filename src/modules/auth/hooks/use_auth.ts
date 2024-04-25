import { useFields, useToast } from "@modules/core/hooks"
import { useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { AuthPayload, authSchema } from "../models"
import { AuthRepository } from "../repositories"
import { authStore } from "../stores"
import { getErrorMessage } from "@utils/errors"

const authRepository = new AuthRepository()

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

      const {
        isSignIn,
        redirecUrl,
        user: logedUser,
      } = await authRepository.login(values)

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
    authRepository.logout()
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
