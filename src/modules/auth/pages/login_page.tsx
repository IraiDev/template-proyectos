import { Button, Form, Input, PasswordToggler } from "@modules/core/components"
import { useAuth } from "../hooks"
import AuthLayout from "../layouts/auth_layout"

const LoginPage = () => {
  const { field, handleLogin, isLoginLoading } = useAuth()
  return (
    <AuthLayout
      title="Iniciar Sesión"
      tabTitle={isLoginLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}>
      <Form onSubmit={handleLogin} className="w-64">
        <Input fullWidth {...field("correo", { label: "Correo" })} />
        <PasswordToggler>
          {({ Toggler, type }) => (
            <Input
              {...field("contrasena", { label: "Contraseña", type })}
              endContent={Toggler}
            />
          )}
        </PasswordToggler>

        <Button type="submit" isLoading={isLoginLoading} className="mt-3">
          Iniciar Sesión
        </Button>
      </Form>
    </AuthLayout>
  )
}

export default LoginPage
