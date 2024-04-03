import { Size } from "@configs/types"
import { twclx } from "@utils/functions"

interface Props {
  label: string
  tooltip?: string
  size?: Size
  defaultContent?: string
  value?: string | number
}

export function TextItem({
  label,
  value,
  tooltip,
  size = "sm",
  defaultContent = "sin dato...",
}: Props) {
  return (
    <p title={tooltip} className={sizes[size]}>
      <strong className="font-semibold mr-1.5">{label}:</strong>
      <span className={twclx(!value && "text-foreground-500")}>{value || defaultContent}</span>
    </p>
  )
}

const sizes: Record<Size, string> = {
  lg: "text-lg",
  md: "text-base",
  sm: "text-sm",
  xs: "text-xs",
}
