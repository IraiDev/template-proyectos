import { ICON_SIZE } from "@config/constants"
import { actions } from "@router/routes/actions"
import { IconMenu2, IconPlus, IconRefresh } from "@tabler/icons-react"
import { twclx } from "@utils/tailwind"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import { Button, Pagination } from "../components"
import { usePagination } from "../hooks"
import { uiStore } from "../stores"

type Props = {
  title: string
  tabTitle: string
  icon: JSX.Element
  onReload?(): void
  hideFooter?: boolean
  totalRegisters?: number
  hidePagination?: boolean
  children: React.ReactNode
  filters?: React.ReactNode
  extendsHeader?: React.ReactNode
  onChangePage?(value: number): void
  create?: Partial<{
    label: string
    onClick(): void
    isHidden: boolean
    icon: JSX.Element
    action: "navigate" | "click"
  }>
  classNames?: Partial<{
    header: string
    body: string
    footer: string
    filters: string
  }>
}

const MainLayout = ({
  icon,
  title,
  create,
  filters,
  tabTitle,
  children,
  onReload,
  onChangePage,
  extendsHeader,
  hidePagination,
  classNames = {},
  totalRegisters = 0,
  hideFooter = false,
}: Props) => {
  const navigate = useNavigate()
  const handleToggleSidebarOpen = uiStore((s) => s.onToggleSidebarOpen)
  const {
    page,
    onChangePage: handleChangePage,
    totalPages,
  } = usePagination({ total: totalRegisters, onChangePage })

  const handleButtonClick = () => {
    if (create?.action === "navigate") {
      navigate(actions.create)
    }

    if (create?.action === "click") {
      create?.onClick?.()
    }
  }

  return (
    <>
      <Helmet>
        <title>{tabTitle}</title>
      </Helmet>

      <div className="flex flex-col *:p-3 *:lg:p-6 flex-1">
        <header className="h-28 flex flex-col gap-3 justify-between">
          <div className={twclx("flex items-start gap-3", classNames?.header)}>
            <Button
              isIconOnly
              variant="light"
              color="default"
              className="lg:hidden"
              onClick={() => handleToggleSidebarOpen(true)}>
              <IconMenu2 size={ICON_SIZE.XL} />
            </Button>

            <figure className="hidden lg:block">{icon}</figure>

            <h1
              title={title}
              className={twclx(
                "text-xl md:text-2xl font-bold truncate",
                extendsHeader || (create && !create.isHidden)
                  ? "w-32 sm:w-max"
                  : "w-full",
              )}>
              {title}
            </h1>

            {onReload && (
              <Button
                isIconOnly
                variant="light"
                color="default"
                title="Recargar"
                onClick={onReload}>
                <IconRefresh size={ICON_SIZE.DEFAULT} />
              </Button>
            )}

            <div className="ml-auto">
              {!extendsHeader && create && !create.isHidden && (
                <Button
                  onClick={handleButtonClick}
                  startContent={
                    create?.icon ?? <IconPlus size={ICON_SIZE.DEFAULT} />
                  }>
                  {create?.label ?? "Crear"}
                </Button>
              )}

              {extendsHeader}
            </div>
          </div>

          <div className={classNames?.filters}>{filters}</div>
        </header>

        <div
          className={twclx(
            "h-[calc(100vh-24px-112px-56px)] overflow-auto",
            classNames?.body,
          )}>
          {children}
        </div>

        {!hideFooter && (
          <footer
            className={twclx(
              "h-20 flex justify-between pt-1.5 px-3",
              classNames?.footer,
            )}>
            <div className="text-lg font-semibold">
              <span className="inline md:hidden">Nº</span>
              <span className="hidden md:inline">Numero</span>
              <span> de registros: </span>
              <span>{totalRegisters}</span>
            </div>

            {!hidePagination && (
              <Pagination
                total={totalPages}
                page={page}
                onChange={handleChangePage}
              />
            )}
          </footer>
        )}
      </div>
    </>
  )
}
export default MainLayout
