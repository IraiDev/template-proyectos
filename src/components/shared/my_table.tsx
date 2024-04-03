import { TableColumn } from "@configs/interfaces"
import { Align, TableDataset, Valign } from "@configs/types"
import { Spinner } from "@nextui-org/react"
import { twclx } from "@utils/functions"

interface Props<T extends object> {
  className?: string
  isLoading?: boolean
  emptyContent?: string
  columns: TableColumn[]
  alignEmptyContent?: Align
  wrapperClassName?: string
  dataset: TableDataset<T>[]
  renderFooter?(): JSX.Element[]
  renderFilter?(cols: TableColumn[]): JSX.Element[]
  renderCells?(item: T, index: number): JSX.Element[]
}

export function MyTable<T extends object>({
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
    <div className={twclx("relative w-full overflow-auto", wrapperClassName)}>
      {isLoading && <Loader />}

      <table className={twclx("min-w-full w-full", className)}>
        <thead className="[&>trs]:last:rounded-lg sticky top-0 z-20 [&>trs]:last:shadow-small">
          {renderFilter && (
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

        <tbody className={dataset.length === 0 ? "h-12" : ""}>
          {dataset.map(({ key, ...item }: TableDataset<T>, idx) => (
            <MyTableRow key={key}>{renderCells?.(item as T, idx)}</MyTableRow>
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

interface MyTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
  selectedRow?: boolean
  onSelectRow?(): void
}

export function MyTableRow({ children, ...props }: MyTableRowProps) {
  return (
    <tr
      {...props}
      className={twclx(
        "outline-none even:bg-background-200/50 odd:bg-transparent hover:bg-default-300 transition-colors",
      )}>
      {children}
    </tr>
  )
}

interface MyTableCellProps extends React.TableHTMLAttributes<HTMLTableCellElement> {
  valign: Valign
  colSpan: number
  className: string
  clickeable: boolean
  children: React.ReactNode
}

export function MyTableCell({
  children,
  className,
  clickeable,
  ...props
}: Partial<MyTableCellProps>) {
  return (
    <td
      valign="top"
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

interface EmptyContentProps {
  colSpan: number
  align: Align
  content: string
}

function EmptyContent({ content, ...props }: EmptyContentProps) {
  return (
    <tr>
      <td {...props} className="px-6">
        <span className="text-default-400 italic">{content}</span>
      </td>
    </tr>
  )
}

function Loader() {
  return (
    <div className="bg-white border border-default-300 rounded-full p-2 shadow-lg">
      <Spinner />
    </div>
  )
}
