import { MyButton, MyInput } from "@components/index"
import { useLogin } from "../hooks"

export const LoginPage = () => {
  const { handleLogin, isLoading } = useLogin()
  return (
    <form
      onSubmit={handleLogin}
      className="h-screen grid place-content-center gap-2">
      <MyInput required label="Nombre" name="user" />
      <MyButton type="submit" isLoading={isLoading}>
        Login
      </MyButton>
      <span>{isLoading && "Iniciando sesion..."}</span>
    </form>
  )
}
