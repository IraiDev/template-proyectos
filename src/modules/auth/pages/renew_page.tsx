import { Spinner } from "@nextui-org/react"
import { routes } from "@router/routes"
import { LocalStorage } from "@utils/local_storage"
import { Helmet } from "react-helmet"
import { Navigate } from "react-router-dom"
import { useRenew } from "../hooks"

const path = new LocalStorage<string>("LAST_VISITED_URL")

const RenewPage = () => {
  const { isSignIn, hasSession } = useRenew()
  const currentPath = path.get({ defaultValue: routes.private.home })

  if (!hasSession) return <Navigate to={routes.public.login} replace />

  if (isSignIn) return <Navigate to={currentPath} replace />

  return (
    <>
      <div className="h-screen w-full grid place-content-center">
        <section className="flex flex-col gap-2 items-center">
          <span>Validando Sesión...</span>
          <Spinner />
        </section>
      </div>
      <Helmet>
        <title>Validando Sesión...</title>
      </Helmet>
    </>
  )
}

export default RenewPage
