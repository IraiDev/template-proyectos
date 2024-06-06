import { ICON_SIZE } from "@config/constants"
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconExclamationCircle,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react"
import { twclx } from "src/helpers/tailwind"
import { ToastContainer, TypeOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ToastProvider = () => {
  return (
    <ToastContainer
      toastClassName={(props) =>
        twclx(
          "relative flex !p-0 min-h-10 rounded-medium justify-between overflow-hidden my-2",
          "transition-colors shadow-large font-semibold text-white bg-gradient-to-br",
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

export default ToastProvider

const ToastCloseButton = () => {
  return (
    <button
      className={twclx(
        "text-white h-6 w-6 rounded-full grid justify-center items-center",
        "top-1.5 right-2 absolute hover:bg-white/10",
        "transition-colors",
      )}
    >
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
  default: "from-default-200 to-default-100 text-neutral-700",
  error: "from-red-600 to-red-500",
  info: "from-blue-600 to-blue-500",
  success: "from-green-600 to-green-500",
  warning: "from-yellow-600 to-yellow-500",
}
