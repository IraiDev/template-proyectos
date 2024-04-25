import { useState } from "react"

export function useToggle(initialValue?: boolean) {
  const [isOpen, toggler] = useState(initialValue ?? false)

  const handleToggle = () => {
    toggler((prev) => !prev)
  }

  return [isOpen, handleToggle] as const
}
