import { TableColumn as TableColumnType } from "@config/interfaces"
import { Align, Valign } from "@config/types"
import { Spinner } from "@nextui-org/react"
import { twclx } from "@helpers/tailwind"

type Props<T extends object> = {
  dataset: T[]
  className?: string
  isLoading?: boolean
  emptyContent?: string
  alignEmptyContent?: Align
  wrapperClassName?: string
  columns: TableColumnType[]
  renderFooter?(): JSX.Element
  renderFilter?(cols: ExtractColumn[]): JSX.Element
  renderCells?(item: T, index: number): JSX.Element
}

const Table = <T extends object>({
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
}: Props<T>) => {
  return (
    <div
      className={twclx(
        "relative w-full overflow-auto h-auto min-h-unit-20",
        wrapperClassName,
      )}
    >
      {isLoading && <Loader />}

      <table className={twclx("min-w-full w-full", className)}>
        <thead className="[&>trs]:last:rounded-lg sticky top-0 z-20 [&>trs]:last:shadow-small">
          {renderFilter !== undefined && (
            <tr className="bg-transparent">{renderFilter(columns)}</tr>
          )}

          <tr className="bg-default-200">
            {columns.map(({ content, ...column }) => (
              <TableColumn {...column}>{content}</TableColumn>
            ))}
          </tr>
        </thead>

        <tbody className={dataset.length === 0 ? "h-24" : ""}>
          {dataset.map((item, idx) => renderCells?.(item, idx))}

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

export default Table

export const TableColumn = ({
  width,
  children,
  ...props
}: TableColumnProps) => {
  return (
    <th
      {...props}
      style={{ width }}
      className={twclx(
        "capitalize whitespace-nowrap font-bold text-tiny",
        "outline-none group p-2 first:rounded-l-lg last:rounded-r-lg",
      )}
    >
      {children}
    </th>
  )
}

export const TableCell = ({
  children,
  className,
  clickeable,
  ...props
}: Partial<MyTableCellProps>) => {
  return (
    <td
      valign="middle"
      {...props}
      className={twclx(
        "bg-transparent",
        "p-2 whitespace-normal text-small border-b border-default-300",
        clickeable && "cursor-pointer",
        className,
      )}
    >
      {children}
    </td>
  )
}

export const Loader = () => {
  return (
    <div
      className={twclx(
        "w-12 h-12 grid place-content-center p-2 rounded-full",
        "absolute top-1/2 left-1/2 -translate-x-1/2 z-50",
        "bg-white border border-default-300 shadow-lg",
      )}
    >
      <Spinner />
    </div>
  )
}

const EmptyContent = ({ content, ...props }: EmptyContentProps) => {
  return (
    <tr>
      <td {...props} className="px-6">
        <span className="text-default-400 italic text-small">{content}</span>
      </td>
    </tr>
  )
}

type ExtractColumn = Pick<TableColumnType, "align" | "key">

type TableColumnProps = {
  children: React.ReactNode
} & Omit<TableColumnType, "content">

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
