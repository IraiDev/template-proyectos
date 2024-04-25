import { ReactNode } from "react"
import { IconEye, IconEyeOff } from "@tabler/icons-react"
import { ICON_SIZE } from "@config/constants"
import { useToggle } from "@modules/core/hooks"

type Props = {
  children(props: { type: "password" | "text"; Toggler: ReactNode }): ReactNode
}

export function PasswordToggler({ children }: Props) {
  const [show, handleToggle] = useToggle()

  return (
    <>
      {children({
        type: show ? "text" : "password",
        Toggler: (
          <button
            type="button"
            tabIndex={-1}
            onClick={handleToggle}
            className="text-default-500 !outline-none hover:text-primary transition-colors"
          >
            {show ? <IconEyeOff size={ICON_SIZE.LG} /> : <IconEye size={ICON_SIZE.LG} />}
          </button>
        ),
      })}
    </>
  )
}
