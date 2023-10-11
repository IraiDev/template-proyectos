import { useState } from "react"

export function useTogglePassword(initialValue: boolean | undefined = false) {
  const [showPassword, tooglePassword] = useState(initialValue)

  const handleTogglePassword = () => {
    tooglePassword((prev) => !prev)
  }

  return [showPassword, handleTogglePassword] as const
}
