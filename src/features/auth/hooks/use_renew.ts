import { useNavigate } from "react-router-dom"
import { AuthStore } from "../stores"
import { getFromLocalStorage, isInLocalStorage, sleep } from "@utils/functions"
import { privateRoutes, publicRoutes } from "@configs/routes"
import { useEffect } from "react"

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
        navigate(value ? `/${privateRoutes.home}` : `/${publicRoutes.login}`, {
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
