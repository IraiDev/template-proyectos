import { Button, Input } from "@components/index"
import { useLogin } from "../hooks"

export const LoginPage = () => {
  const { handleLogin, isLoading } = useLogin()
  return (
    <form
      onSubmit={handleLogin}
      className="h-screen grid place-content-center gap-2">
      <Input required label="Nombre" name="user" />
      <Button type="submit" isLoading={isLoading}>
        Login
      </Button>
      <span>{isLoading && "Iniciando sesion..."}</span>
    </form>
  )
}
