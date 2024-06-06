import { twclx } from "src/helpers/tailwind"
import { ReactNode } from "react"

type Props = {
  isOpen?: boolean
  children: ReactNode
}

const Sidebar = ({ children, isOpen }: Props) => {
  return (
    <aside
      className={twclx(
        "fixed z-30 lg:static w-64 min-w-64 border-r border-default-300 bg-white",
        isOpen ? "left-0" : "-translate-x-full",
        "lg:left-0 lg:translate-x-0 transition-all",
      )}
    >
      {children}
    </aside>
  )
}

export default Sidebar

export const SidebarHeader = ({ children, className }: SidebarChildProps) => {
  return (
    <header className={twclx("h-44 flex flex-col", className)}>
      {children}
    </header>
  )
}

export const SidebarBody = ({ children, className }: SidebarChildProps) => {
  return <div className={twclx("grow", className)}>{children}</div>
}

export const SidebarFooter = ({ children, className }: SidebarChildProps) => {
  return (
    <footer className={twclx("h-28 p-3 flex flex-col items-start", className)}>
      {children}
    </footer>
  )
}

type SidebarChildProps = {
  children: ReactNode
  className?: string
}
