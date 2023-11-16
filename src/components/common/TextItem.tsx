import { cn } from "@nextui-org/react"

interface Props {
  tooltip?: string
  label: string
  content?: string | number
  defaultContent?: string
  size?: Size
}

export function TextItem({
  label,
  content,
  defaultContent = "sin dato...",
  size = "sm",
  tooltip,
}: Props) {
  const sizes: Record<Size, string> = {
    lg: "text-lg",
    md: "text-base",
    sm: "text-sm",
  }

  return (
    <p title={tooltip} className={sizes[size]}>
      <strong className="font-semibold mr-1.5">{label}:</strong>
      <span className={cn(!content && "text-foreground-500")}>{content || defaultContent}</span>
    </p>
  )
}
