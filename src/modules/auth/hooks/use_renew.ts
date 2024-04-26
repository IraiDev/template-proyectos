import { useToast } from "@modules/core/hooks"
import { routes } from "@router/routes"
import { LocalStorage, getErrorMessage } from "@utils/index"
import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { AuthRepository } from "../repositories"
import { authStore } from "../stores"

const token = new LocalStorage("TOKEN_KEY")
const auth = new AuthRepository()

export function useRenew() {
  const isSignIn = authStore((state) => state.isSignIn)
  const [setUser, setSignIn] = authStore((state) => [
    state.setUser,
    state.setSignIn,
  ])

  const hasSession = useMemo(() => token.exists(), [])
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
