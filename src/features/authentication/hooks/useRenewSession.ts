import { useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@features/authentication/stores"
import { privateRoutes } from "@configs/routes"
import { hasAuthToken } from "@utils/localStorage.util"
import { useToast } from "@utils/hooks"

export function useRenewSession() {
  const authentication = useAuthStore((state) => state.authentication)
  const renew = useAuthStore((state) => state.renew)
  const navigate = useNavigate()
  const { warningToast, errorToast, successToast } = useToast()

  useLayoutEffect(() => {
    if (hasAuthToken() && authentication === "NOT-AUTHENTICATED") {
      renew({
        successFn: ({ ok, message }) => {
          if (!ok) {
            warningToast(message)
            return
          }

          successToast(message)
          navigate("/" + privateRoutes.home, { replace: true })
        },
        errorFn: (message) => {
          errorToast(message)
        },
      })
    }
  }, [authentication, renew, navigate, warningToast, errorToast, successToast])

  return authentication
}
