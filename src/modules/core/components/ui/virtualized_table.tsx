import { TableColumn as TableColumnType } from "@config/interfaces"
import { twclx } from "@utils/index"
import { TableVirtuoso } from "react-virtuoso"
import { Loader, TableColumn } from "./table"

type Props<T extends object> = {
  dataset: T[]
  tableHeight: number
  isLoading?: boolean
  emptyContent?: string
  wrapperClassName?: string
  columns: TableColumnType[]
  renderFooter?(): JSX.Element
  renderFilter?(): JSX.Element
  renderCells(item: T, index: number): JSX.Element
}

export function VirtualizedTable<T extends object>({
  isLoading,
  tableHeight,
  renderCells,
  dataset = [],
  columns = [],
  renderFilter,
  renderFooter,
  wrapperClassName,
  emptyContent = "No hay datos...",
}: Props<T>) {
  return (
    <div
      className={twclx(
        "relative overflow-auto h-auto mx-auto max-w-max",
        wrapperClassName,
      )}>
      {isLoading && <Loader />}

      <TableVirtuoso
        style={{
          height: dataset.length === 0 ? 80 : tableHeight,
          width: columns.reduce((acc, cur) => acc + (cur.width ?? 0), 0),
        }}
        data={dataset}
        fixedHeaderContent={() => (
          <>
            {renderFilter !== undefined && (
              <tr className="bg-white">{renderFilter()}</tr>
            )}

            <tr className="bg-default-300">
              {columns.map(({ content, ...column }) => (
                <TableColumn {...column}>{content}</TableColumn>
              ))}
            </tr>
          </>
        )}
        fixedFooterContent={() => renderFooter?.()}
        itemContent={(idx, item) => renderCells(item, idx)}
      />
      {dataset.length === 0 && <EmptyContent content={emptyContent} />}
    </div>
  )
}

function EmptyContent({ content }: EmptyContentProps) {
  return (
    <div className="px-6">
      <span className="text-default-400 italic text-small">{content}</span>
    </div>
  )
}

type EmptyContentProps = {
  content: string
}
