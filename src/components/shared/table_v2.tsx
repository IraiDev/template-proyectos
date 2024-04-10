import { TableColumn } from "@configs/interfaces"
import { Align, Valign } from "@configs/types"
import { Spinner } from "@nextui-org/react"
import { twclx } from "@utils/index"
import { TableVirtuoso } from "react-virtuoso"

type Props<T extends object> = {
  dataset: T[]
  tableHeight: number
  isLoading?: boolean
  emptyContent?: string
  columns: TableColumn[]
  alignEmptyContent?: Align
  wrapperClassName?: string
  renderFooter?(): JSX.Element
  renderFilter?(cols: ExtractColumn[]): JSX.Element
  renderCells(item: T, index: number): JSX.Element
}

export function TableV2<T extends object>({
  isLoading,
  tableHeight,
  dataset = [],
  columns = [],
  renderCells,
  renderFilter,
  renderFooter,
  wrapperClassName,
  alignEmptyContent = "left",
  emptyContent = "No hay datos...",
}: Props<T>) {
  return (
    <div
      className={twclx(
        "relative overflow-auto h-auto mx-auto w-max",
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
              <tr className="bg-white">{renderFilter(columns)}</tr>
            )}

            <tr className="bg-default-300">
              {columns.map(({ content, width, ...column }) => (
                <th
                  {...column}
                  style={{ width }}
                  className={twclx(
                    "uppercase whitespace-nowrap font-bold text-tiny",
                    "odd:bg-default-200/40 outline-none group p-2 first:rounded-l-lg last:rounded-r-lg",
                  )}>
                  {content}
                </th>
              ))}
            </tr>
          </>
        )}
        fixedFooterContent={() => renderFooter?.()}
        itemContent={(idx, item) => renderCells(item, idx)}
      />
      {dataset.length === 0 && (
        <EmptyContent align={alignEmptyContent} content={emptyContent} />
      )}
    </div>
  )
}

export function TableCell({
  children,
  className,
  clickeable,
  ...props
}: Partial<MyTableCellProps>) {
  return (
    <td
      valign="middle"
      {...props}
      className={twclx(
        "bg-transparent even:bg-default-200/30",
        "p-2 whitespace-normal text-small",
        clickeable && "cursor-pointer",
        className,
      )}>
      {children}
    </td>
  )
}

export function TableRow({ children, ...props }: MyTableRowProps) {
  return (
    <tr
      {...props}
      className={twclx(
        "outline-none even:bg-background-100 odd:bg-transparent hover:bg-default-200/70 transition-colors",
      )}>
      {children}
    </tr>
  )
}

function EmptyContent({ content, ...props }: EmptyContentProps) {
  return (
    <>
      <div {...props} className="px-6">
        <span className="text-default-400 italic text-small">{content}</span>
      </div>
    </>
  )
}

function Loader() {
  return (
    <div
      className={twclx(
        "w-12 h-12 grid place-content-center p-2 rounded-full",
        "absolute top-1/2 left-1/2 -translate-x-1/2 z-50",
        "bg-white border border-default-300 shadow-lg",
      )}>
      <Spinner />
    </div>
  )
}
type ExtractColumn = Pick<TableColumn, "align" | "key">

type MyTableRowProps = {
  onSelectRow?(): void
  selectedRow?: boolean
  children: React.ReactNode
} & React.HTMLAttributes<HTMLTableRowElement>

type MyTableCellProps = {
  valign: Valign
  colSpan: number
  className: string
  clickeable: boolean
  children: React.ReactNode
} & React.TableHTMLAttributes<HTMLTableCellElement>

type EmptyContentProps = {
  align: Align
  content: string
}
