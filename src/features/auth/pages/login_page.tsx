import { Button, Input } from "@components/index"
import { useAuth } from "../hooks"

export const LoginPage = () => {
  const { handleLogin, isLoginLoading } = useAuth()
  return (
    <form
      onSubmit={handleLogin}
      className="h-screen grid place-content-center gap-2">
      <Input required label="Nombre" name="user" />
      <Button type="submit" isLoading={isLoginLoading}>
        Login
      </Button>
    </form>
  )
}
