import { saveInLocalStorage, sleep } from "@utils/functions"
import { AuthStore } from "../stores"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { privateRoutes } from "@configs/routes"

export function useLogin() {
  const setUser = AuthStore((state) => state.setUser)
  const setSignIn = AuthStore((state) => state.setSignIn)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const { user } = e.target as HTMLFormElement

    setIsLoading(true)
    sleep(3)
      .then((value) => {
        setSignIn(value)
        if (value) {
          setUser(user.value)
          saveInLocalStorage("TEST", user.value)
          navigate(`/${privateRoutes.home}`, { replace: true })
        }
      })
      .catch(() => {
        alert("error login")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    isLoading,
    handleLogin,
  }
}
