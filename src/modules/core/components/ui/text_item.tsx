import { Size } from "@config/types"
import { twclx } from "@helpers/tailwind"

type Props = {
  size?: Size
  label: string
  tooltip?: string
  className?: string
  defaultValue?: string
  value?: string | number
  classNames?: { label?: string; value?: string }
}

const TextItem = ({
  label,
  value,
  tooltip,
  className,
  classNames,
  size = "sm",
  defaultValue = "sin dato...",
}: Props) => {
  return (
    <p className={twclx("whitespace-pre-wrap w-full", sizes[size], className)}>
      <strong className={twclx("font-semibold mr-1.5", classNames?.label)}>
        {label}:
      </strong>
      <span
        title={tooltip}
        data-has-value={Boolean(value)}
        className={twclx(
          "data-[has-value=false]:text-default-400 text-default-600",
          classNames?.value,
        )}
      >
        {value || defaultValue}
      </span>
    </p>
  )
}

export default TextItem

const sizes: Record<Size, string> = {
  lg: "text-lg",
  md: "text-base",
  sm: "text-sm",
  xs: "text-xs",
}
