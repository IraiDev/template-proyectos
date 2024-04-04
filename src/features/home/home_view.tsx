import { useAuthStore } from "@features/auth/stores"

export const HomeView = () => {
  const user = useAuthStore((state) => state.user)
  return <div>Bienvenido {user}</div>
}
