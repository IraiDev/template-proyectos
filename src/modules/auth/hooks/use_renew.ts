import { isInLocalStorage } from "@utils/index"
import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { AuthRepository } from "../repositories"
import { authStore } from "../stores"

export function useRenew() {
  const isSignIn = authStore((state) => state.isSignIn)
  const [setUser, setSignIn] = authStore((state) => [state.setUser, state.setSignIn])
  const hasSession = useMemo(() => isInLocalStorage("TEST"), [])
  const navigate = useNavigate()

  const authRepository = useMemo(() => new AuthRepository(), [])

  useEffect(() => {
    if (!hasSession) return

    const onRenew = async () => {
      try {
        const { isSignIn, redirecUrl, user } = await authRepository.renew()
        navigate(redirecUrl, { replace: true })
        setSignIn(isSignIn)
        setUser(user)
      } catch (e) {
        alert(e)
      }
    }

    onRenew()
  }, [navigate, setSignIn, setUser, hasSession, authRepository])

  return {
    isSignIn,
    hasSession,
  }
}
