import { TableColumn } from "@configs/interfaces"
import { Align, TableDataset, Valign } from "@configs/types"
import { Spinner } from "@nextui-org/react"
import { twclx } from "@utils/functions"

type Props<T extends object> = {
  className?: string
  isLoading?: boolean
  emptyContent?: string
  columns: TableColumn[]
  alignEmptyContent?: Align
  wrapperClassName?: string
  dataset: TableDataset<T>[]
  renderFooter?(): JSX.Element
  renderFilter?(cols: ExtractColumn[]): JSX.Element
  renderCells?(item: T, index: number): JSX.Element
}

export function Table<T extends object>({
  isLoading,
  className,
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
        "relative w-full overflow-auto h-auto min-h-unit-20",
        wrapperClassName,
      )}>
      {isLoading && <Loader />}

      <table className={twclx("min-w-full w-full", className)}>
        <thead className="[&>trs]:last:rounded-lg sticky top-0 z-20 [&>trs]:last:shadow-small">
          {renderFilter !== undefined && (
            <tr className="bg-transparent">{renderFilter(columns)}</tr>
          )}

          <tr className="bg-default-300">
            {columns.map(({ content, ...column }) => (
              <th
                {...column}
                className={twclx(
                  "uppercase whitespace-nowrap font-bold text-tiny",
                  "odd:bg-default-200/40 outline-none group p-2 first:rounded-l-lg last:rounded-r-lg",
                )}>
                {content}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={dataset.length === 0 ? "h-24" : ""}>
          {dataset.map(({ key, ...item }: TableDataset<T>, idx) => (
            <TableRow key={key}>{renderCells?.(item as T, idx)}</TableRow>
          ))}

          {dataset.length === 0 && (
            <EmptyContent
              align={alignEmptyContent}
              colSpan={columns.length}
              content={emptyContent}
            />
          )}
        </tbody>

        {renderFooter && <tfoot>{renderFooter()}</tfoot>}
      </table>
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

function TableRow({ children, ...props }: MyTableRowProps) {
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
    <tr>
      <td {...props} className="px-6">
        <span className="text-default-400 italic text-small">{content}</span>
      </td>
    </tr>
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
  colSpan: number
  content: string
}
