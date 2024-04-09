import { routes } from "@router/routes"
import { getFromLocalStorage, isInLocalStorage, sleep } from "@utils/index"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthStore } from "../stores"

export function useRenew() {
  const setUser = AuthStore((state) => state.setUser)
  const setSignIn = AuthStore((state) => state.setSignIn)
  const isSignIn = AuthStore((state) => state.isSignIn)
  const navigate = useNavigate()
  const hasSession = isInLocalStorage("TEST")

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
