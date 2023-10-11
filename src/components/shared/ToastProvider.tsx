import {
  IconAlertTriangle,
  IconBellRinging,
  IconCircleCheck,
  IconExclamationCircle,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react"
import { twJoin } from "tailwind-merge"
import { ToastContainer, TypeOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Icons: Record<TypeOptions, React.ReactNode> = {
  default: <IconBellRinging size={26} className="text-default-600" />,
  error: <IconExclamationCircle size={30} className="text-red-600" />,
  info: <IconInfoCircle size={30} className="text-blue-600" />,
  success: <IconCircleCheck size={30} className="text-green-500" />,
  warning: <IconAlertTriangle size={30} className="text-orange-500" />,
}

export function ToastProvider() {
  return (
    <ToastContainer
      toastClassName={twJoin(
        "relative flex p-1 min-h-10 rounded-large justify-between overflow-hidden cursor-pointer my-2",
        "bg-default-100 text-default-900",
      )}
      bodyClassName="text-sm font-inherit block p-3 flex gap-3"
      icon={({ type }) => Icons[type]}
      closeButton={
        <button
          className={twJoin(
            "text-inherit h-6 w-6 rounded-small grid place-content-center",
            "transition-colors hover:text-default-500",
          )}>
          <IconX size={17} />
        </button>
      }
      position="top-center"
      autoClose={4000}
    />
  )
}
