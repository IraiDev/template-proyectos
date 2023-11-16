import { cn } from "@nextui-org/react"

interface Props {
  className?: string
  children: React.ReactNode
  onSubmit(e: React.FormEvent<HTMLFormElement>): void
}

export function Form({ children, className, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-3 w-full", className)}>
      {children}
    </form>
  )
}
