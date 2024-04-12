import { ICON_SIZE } from "@config/constants"
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconExclamationCircle,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react"
import { twclx } from "@utils/index"
import { ToastContainer, TypeOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const ToastProvider = () => {
  return (
    <ToastContainer
      toastClassName={(props) =>
        twclx(
          "relative flex !p-0 min-h-10 rounded-lg justify-between overflow-hidden cursor-pointer my-2",
          "transition-colors shadow-xl font-semibold text-white",
          TOAST_STYLES[props?.type ?? "default"],
        )
      }
      bodyClassName="text-sm font-inherit p-3 flex gap-3 cursor-text"
      icon={({ type }) => ICONS[type]}
      closeButton={<ToastCloseButton />}
      position="bottom-center"
      autoClose={3000}
      limit={3}
    />
  )
}

export const ToastCloseButton = () => {
  return (
    <button
      className={twclx(
        "text-white h-6 w-6 rounded-full grid place-content-center",
        "top-1.5 right-2 absolute hover:bg-white/10",
        "transition-colors",
      )}>
      <IconX size={17} />
    </button>
  )
}

const ICONS: Record<TypeOptions, React.ReactNode> = {
  default: <span />,
  error: <IconExclamationCircle size={ICON_SIZE.XL} />,
  info: <IconInfoCircle size={ICON_SIZE.XL} />,
  success: <IconCircleCheck size={ICON_SIZE.XL} />,
  warning: <IconAlertTriangle size={ICON_SIZE.XL} />,
}

const TOAST_STYLES: Record<TypeOptions, string> = {
  default: "bg-neutral-200 text-neutral-700",
  error: "bg-danger-600",
  info: "bg-info-600",
  success: "bg-success-600",
  warning: "bg-warning-600",
}
