import { Size } from "@configs/types"
import { twclx } from "@utils/index"

type Props = {
  size?: Size
  label: string
  tooltip?: string
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
    <p className={sizes[size]}>
      <strong className="font-semibold mr-1.5">{label}:</strong>
      <span title={tooltip} className={twclx(!value && "text-foreground-500")}>
        {value || defaultContent}
      </span>
    </p>
  )
}

const sizes: Record<Size, string> = {
  lg: "text-lg",
  md: "text-base",
  sm: "text-sm",
  xs: "text-xs",
}
