import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthRepository } from "../repositories"
import { authStore } from "../stores"

export function useAuth() {
  const [user, isSignIn] = authStore((state) => [state.user, state.isSignIn])
  const [setUser, setSignIn] = authStore((state) => [state.setUser, state.setSignIn])
  const [isLoginLoading, setIsLoadingLogin] = useState(false)
  const navigate = useNavigate()

  const authRepository = new AuthRepository()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const { user } = e.target as HTMLFormElement

    try {
      setIsLoadingLogin(true)

      const {
        isSignIn,
        redirecUrl,
        user: logedUser,
      } = await authRepository.login({ usuario: user.value })
      isSignIn && navigate(redirecUrl, { replace: true })
      setSignIn(isSignIn)
      setUser(logedUser)
    } catch (e) {
      alert(e)
    } finally {
      setIsLoadingLogin(false)
    }
  }

  const handleLogout = () => {
    authRepository.logout()
    setSignIn(false)
    setUser(null)
  }

  return {
    user,
    isSignIn,
    handleLogin,
    handleLogout,
    isLoginLoading,
  }
}
