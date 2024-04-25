import { twclx } from "@utils/tailwind"
import { Button } from "./button"
import { IconX } from "@tabler/icons-react"
import { ICON_SIZE } from "@config/constants"
import { ReactNode } from "react"

type Props = {
  isOpen: boolean
  children: ReactNode
  onToggle(value?: boolean): void
}

export const Sidebar = ({ children, isOpen, onToggle }: Props) => {
  return (
    <aside
      className={twclx(
        "fixed z-30 lg:static w-64 min-w-64 border-r border-default-300 bg-white",
        isOpen ? "left-0" : "-translate-x-full",
        "lg:left-0 lg:translate-x-0 transition-all",
      )}>
      <Button
        isIconOnly
        color="default"
        variant="light"
        onClick={() => onToggle(!isOpen)}
        className={twclx("absolute right-2 top-2 lg:hidden")}>
        <IconX
          size={ICON_SIZE.DEFAULT}
          className={twclx(isOpen ? "" : "rotate-180", "transition-all")}
        />
      </Button>
      {children}
    </aside>
  )
}

export const SidebarHeader = ({ children, classNames }: SidebarHeaderProps) => {
  return (
    <header className={twclx("h-44 grid place-content-center", classNames?.wrapper)}>
      <div
        className={twclx(
          "rounded-full h-28 w-28 bg-default-300 grid place-content-center",
          classNames?.imageWrapper,
        )}>
        {children}
      </div>
    </header>
  )
}

export const SidebarBody = ({ title, children, classNames }: SidebarBodyProps) => {
  return (
    <div className={twclx("px-2", classNames?.wrapper)}>
      <section className={twclx("h-10", classNames?.titleWrapper)}>
        <h5 className={twclx("text-xl font-bold px-3", classNames?.title)}>{title}</h5>
      </section>

      <section
        className={twclx(
          "h-[calc(100vh-176px-112px-40px)] overflow-auto",
          classNames?.listWrapper,
        )}>
        <ul className={twclx("flex flex-col gap-1.5", classNames?.list)}>{children}</ul>
      </section>
    </div>
  )
}

export const SidebarFooter = ({ children, classNames }: SidebarFooterProps) => {
  return (
    <footer
      className={twclx(
        "h-28 p-3 flex flex-col items-start gap-3 justify-end",
        classNames?.wrapper,
      )}>
      {children}
    </footer>
  )
}

type SidebarHeaderProps = BaseSidebarProps<{ children: ReactNode }, { imageWrapper: string }>

type SidebarBodyProps = BaseSidebarProps<
  { title: string },
  { titleWrapper: string; title: string; listWrapper: string; list: string }
>

type SidebarFooterProps = BaseSidebarProps<any, any>

type BaseSidebarProps<T extends Record<string, any>, C extends object> = Partial<{
  children: ReactNode
  classNames: Partial<{ wrapper: string } & C>
}> &
  T
