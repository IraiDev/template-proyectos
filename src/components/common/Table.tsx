import { columnStyles } from "@configs/theme"
import {
  Table as NextTable,
  TableBody,
  TableBodyProps,
  TableColumn,
  TableHeader,
  TableProps,
} from "@nextui-org/react"

interface Props extends TableProps {
  columns: Column[]
  bodyProps?: Partial<TableBodyProps<Column>>
  children: any
}

export function Table({ columns = [], children, bodyProps, ...props }: Props) {
  return (
    <NextTable
      isStriped
      isHeaderSticky
      aria-label="Tabla"
      topContentPlacement="outside"
      shadow="none"
      layout="fixed"
      {...props}
      classNames={{
        base: "max-h-[calc(100vh-17px-17px-17px-17px-17px-17px-172px)]",
        thead: "-top-4",
        th: "!bg-default-200",
        ...props.classNames,
      }}>
      <TableHeader>
        {columns.map(({ content, key, ...rest }, idx) => (
          <TableColumn
            key={key}
            {...rest}
            minWidth={rest.width}
            className={columnStyles(columns, idx, true)}>
            {content}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody {...bodyProps}>{children}</TableBody>
    </NextTable>
  )
}
