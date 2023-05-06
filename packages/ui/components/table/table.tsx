import {
  flexRender,
  getCoreRowModel,
  Row,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../button';
import Link, { LinkProps } from '../link';
import Text from '../text';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    compact?: boolean;
  }
}

interface Data extends Object {
  id?: string;
}

type TableColumn<T extends Data> = {
  accessor: keyof T;
  header: string;
  render?: (row: T) => React.ReactElement | null;
  compact?: boolean;
};

type RootProps<T extends Data> = {
  data: T[];
  columns: TableColumn<T>[];
  flush?: boolean;
  href?: (row: Row<T>) => LinkProps['href'];
  external?: LinkProps['external'];
  align?: 'top' | 'middle';
};

const Root = function Table<T extends Data>({
  data,
  columns: columnsProp,
  href,
  flush,
  external,
}: RootProps<T>): React.ReactElement | null {
  const columns = columnsProp.map((column) => {
    return {
      accessorKey: column.accessor,
      header: column.header,
      cell: (cell) => {
        return column.render
          ? column.render(cell.row.original)
          : cell.getValue();
      },
      meta: { compact: column.compact },
    };
  });

  const table = useReactTable<T>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto w-full">
      <div className="table min-w-full">
        <div className="table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <div className="relative table-row" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Text
                  key={header.id}
                  size="xs"
                  weight="medium"
                  uppercase
                  className={clsx(
                    header.column.columnDef.meta?.compact && 'w-px',
                    'table-cell border-b align-middle p-2 whitespace-nowrap',
                    flush ? 'first:pl-5 last:pr-5' : 'first:pl-1 last:pr-1'
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Text>
              ))}
            </div>
          ))}
        </div>
        <div className="table-row-group">
          {table.getRowModel().rows.map((row, i) => {
            return href ? (
              <Link
                href={href(row)}
                external={external}
                className="table-row hover:bg-gray-100 focus-within:bg-gray-100 focus:outline-none"
              >
                {row.getVisibleCells().map((cell) => (
                  <Text
                    key={cell.id}
                    size="sm"
                    className={clsx(
                      cell.column.columnDef.meta?.compact && 'w-px',
                      'table-cell border-b p-2 whitespace-nowrap',
                      flush ? 'first:pl-5 last:pr-5' : 'first:pl-1 last:pr-1',
                      {
                        '!border-b-0':
                          flush && i === table.getRowModel().rows.length - 1,
                      }
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Text>
                ))}
              </Link>
            ) : (
              <div className="table-row">
                {row.getVisibleCells().map((cell) => (
                  <Text
                    key={cell.id}
                    size="sm"
                    className={clsx(
                      cell.column.columnDef.meta?.compact && 'w-px',
                      'table-cell border-b p-2 whitespace-nowrap',
                      flush ? 'first:pl-5 last:pr-5' : 'first:pl-1 last:pr-1',
                      {
                        '!border-b-0':
                          flush && i === table.getRowModel().rows.length - 1,
                      }
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Text>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

type FooterProps = {
  page: number;
  total: number;
  hasMore: boolean;
};

const Footer: React.FC<FooterProps> = function TableFooter({
  page,
  total,
  hasMore,
}) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between text-sm mt-3">
      <Text color="gray">
        <Text as="span">{total}</Text>
        &nbsp;results
      </Text>
      <div className="flex space-x-2">
        <Button
          as={Link}
          href={{ query: { ...router.query, page: page - 1 } }}
          disabled={page === 1}
          variant="light"
        >
          Previous
        </Button>
        <Button
          as={Link}
          href={{ query: { ...router.query, page: page + 1 } }}
          disabled={!hasMore}
          variant="light"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const Table = Object.assign(Root, { Footer });

export type {
  Data as TableData,
  TableColumn as TableColumn,
  RootProps as TableProps,
  FooterProps as TableFooterProps,
};

export default Table;
