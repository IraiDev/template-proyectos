import { MyButton, MyInput } from "@components/index"
import { useLogin } from "../hooks"

export const LoginPage = () => {
  const { handleLogin, isLoading } = useLogin()
  return (
    <form
      onSubmit={handleLogin}
      className="h-screen grid place-content-center gap-2">
      <MyInput label="Nombre" name="user" />
      <MyButton type="submit" isLoading={isLoading}>
        Login
      </MyButton>
      {isLoading && <span>Iniciando sesion...</span>}
    </form>
  )
}
