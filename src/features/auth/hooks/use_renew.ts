import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores"
import { sleep } from "@utils/functions"
import { privateRoutes, publicRoutes } from "@configs/routes"
import { useEffect } from "react"

export function useRenew() {
  const setUser = useAuthStore((state) => state.setUser)
  const setSignIn = useAuthStore((state) => state.setSignIn)
  const isSignIn = useAuthStore((state) => state.isSignIn)
  const navigate = useNavigate()
  const hasSession = localStorage.getItem("user") !== null

  useEffect(() => {
    if (!hasSession) return
    sleep(3)
      .then((value) => {
        setSignIn(value)
        navigate(value ? `/${privateRoutes.home}` : `/${publicRoutes.login}`, {
          replace: true,
        })
        if (value) {
          const user = localStorage.getItem("user") ?? ""
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
