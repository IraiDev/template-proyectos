import { ICON_SIZE } from "@config/constants"
import { ScrollShadow } from "@nextui-org/react"
import { IconX } from "@tabler/icons-react"

type Props = {
  content: string
  onClear?(): void
}

export const FilterItem = ({ content, onClear }: Props) => {
  return (
    <div className="bg-default-200 rounded-md flex items-center gap-1.5 px-2 py-1">
      <strong className="text-tiny max-w-40 truncate" title={content.toString()}>
        {content}
      </strong>
      <button
        type="button"
        onClick={onClear}
        className="!outline-none grid place-content-center h-4 w-4 min-w-4 bg-default-400/70 rounded-full hover:bg-danger-500 hover:text-white transition-colors"
      >
        <IconX size={ICON_SIZE.XS} />
      </button>
    </div>
  )
}

type FiltersListProps = {
  elements: { key: string; name: string; value: string | number }[]
  onClear(key: string): void
  placeholder?: string
  title?: string
}

export const FiltersList = ({
  onClear,
  elements,
  title = "Filtros:",
  placeholder = "Sin filtros...",
}: FiltersListProps) => {
  return (
    <section className="flex-1 flex items-baseline gap-1.5">
      <strong className="font-semibold text-lg">{title}</strong>
      <ScrollShadow
        offset={40}
        hideScrollBar
        orientation="horizontal"
        className="max-w-[calc(100vw-200px)] flex gap-1.5"
      >
        {elements.map(({ key, name, value }) => (
          <FilterItem key={key} onClear={() => onClear(key)} content={`${name}: ${value}`} />
        ))}
      </ScrollShadow>
      {elements.length === 0 && (
        <span className="text-default-500 text-small">{placeholder}</span>
      )}
    </section>
  )
}
