import { ICON_SIZE } from "@config/constants"
import Button from "@modules/core/components/ui/button"
import { alertStore } from "@modules/core/stores/alert_store"
import { IconLogout } from "@tabler/icons-react"

type Props = {
  onLogout(): void
}

export const Logout = ({ onLogout }: Props) => {
  const createAlert = alertStore((s) => s.createAlert)

  const handleLogout = () => {
    createAlert({
      isOpen: true,
      title: "Cerrar Sesión",
      children: "¿Esta seguro de cerrar su sesión?",
      confirm: {
        label: "Confirmar",
        action: onLogout,
      },
    })
  }

  return (
    <>
      <Button
        fullWidth
        variant="light"
        color="default"
        onClick={handleLogout}
        className="justify-start"
        startContent={<IconLogout size={ICON_SIZE.DEFAULT} />}
      >
        Salir
      </Button>
    </>
  )
}
