import { routes } from "@router/routes"
import { getFromLocalStorage, isInLocalStorage, sleep } from "@utils/index"
import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { authStore } from "../stores"

export function useRenew() {
  const isSignIn = authStore((state) => state.isSignIn)
  const [setUser, setSignIn] = authStore((state) => [state.setUser, state.setSignIn])

  const navigate = useNavigate()
  const hasSession = useMemo(() => isInLocalStorage("TEST"), [])

  useEffect(() => {
    if (!hasSession) return

    sleep(3)
      .then((value) => {
        setSignIn(value)
        navigate(value ? `/${routes.private.home}` : `/${routes.public.login}`, {
          replace: true,
        })
        if (value) {
          const user = getFromLocalStorage("TEST")
          setUser(user)
        }
      })
      .catch(() => {
        alert("error renew")
      })
  }, [navigate, setSignIn, setUser, hasSession])

  return {
    isSignIn,
    hasSession,
  }
}
