import { useToast } from "@modules/core/hooks/use_toast"
import { routes } from "@router/routes"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "@helpers/errors"
import { AuthRepository } from "../repositories/auth_repository"
import { authStore } from "../stores/auth_store"

const auth = new AuthRepository()

export function useRenew() {
  const isSignIn = authStore((state) => state.isSignIn)
  const [setUser, setSignIn] = authStore((state) => [
    state.setUser,
    state.setSignIn,
  ])

  const hasSession = auth.hasSession()
  const { errorToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!hasSession) return

    const onRenew = async () => {
      try {
        const { isSignIn, redirecUrl, user } = await auth.renew()
        navigate(redirecUrl, { replace: true })
        setSignIn(isSignIn)
        setUser(user)
      } catch (e) {
        navigate(`/${routes.public.login}`, { replace: true })
        const message = getErrorMessage(e)
        errorToast(message)
      }
    }

    onRenew()
  }, [navigate, setSignIn, setUser, hasSession, errorToast])

  return {
    isSignIn,
    hasSession,
  }
}
