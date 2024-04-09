import { twclx } from "@utils/functions"

interface Props {
  className: string
  title: React.ReactNode
  children: JSX.Element[]
  ref: React.RefObject<HTMLFormElement>
  onSubmit(e: React.FormEvent<HTMLFormElement>): void
}

export function Form({ ref, title, children, onSubmit, className }: Partial<Props>) {
  return (
    <form
      ref={ref}
      onSubmit={onSubmit}
      className={twclx("flex flex-col gap-3 w-full", className)}>
      {title && (
        <header>
          <h1 className="font-2xl font-bold">{title}</h1>
        </header>
      )}
      {children}
    </form>
  )
}
