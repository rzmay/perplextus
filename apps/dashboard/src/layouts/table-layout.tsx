import clsx from 'clsx';
import { ListResponse } from 'lib/utils/types/tsoa/list-response';
import { isEqual, omit } from 'lodash';
import { useRouter } from 'next/router';
import { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';
import React from 'react';
import Link from 'ui/components/link';
import SearchBar from 'ui/components/table/searchbar';
import Table, { TableProps } from 'ui/components/table/table';
import Text from 'ui/components/text';
import BulkSelectContext from 'ui/context/bulk-select';
import useAPI from '../hooks/use-api';

interface TableLayoutProps<T> extends Omit<TableProps<T>, 'data'> {
  empty?: React.ReactNode;
  loading?: React.ReactNode;
  query?: object;
  tabs?: Array<{ title: string; query: ParsedUrlQueryInput }>;
  searchableKeys?: (keyof T)[];
  searchable?: boolean;
  actions?: React.ReactNode;
  paginated?: boolean;
  url: string;
  expand?: (string | any)[];
}

const TableLayout = function TableLayout<T>({
  actions,
  empty,
  loading,
  url,
  searchable,
  paginated,
  searchableKeys = [],
  query = {},
  expand = [],
  tabs,
  ...props
}: TableLayoutProps<T>) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [lastSelectedRow, setLastSelectedRow] = React.useState<
    string | undefined
  >(undefined);

  const bulkSelectContext = React.useMemo(
    () => ({
      selectedRows,
      setSelectedRows,
      lastSelectedRow,
      setLastSelectedRow,
    }),
    [selectedRows, setSelectedRows, lastSelectedRow, setLastSelectedRow]
  );

  const q: ParsedUrlQuery = {};

  searchableKeys.forEach((key: string | number | symbol, i: number) => {
    q[`$or[${i}][${key as string}][$options]`] = 'i';
    q[`$or[${i}][${key as string}][$regex]`] = escapedQuery;
  });

  const { data: results, isLoading } = useAPI<ListResponse<T>>(url, {
    ...query,
    ...(searchable && escapedQuery && q),
    page: router.query.page,
    expand,
  });

  return (
    <div>
      {tabs && (
        <nav className="max-w-full overflow-auto flex border-b mb-5">
          {tabs.map((tab) => (
            <Link
              key={tab.title}
              href={{ pathname: router.pathname, query: tab.query }}
              className="whitespace-nowrap transition duration-100 cursor-pointer px-2 first:pl-0 last:pr-0"
            >
              <div
                className={clsx(
                  'border-b-2 pb-1.5',
                  isEqual(tab.query, omit(router.query, 'page'))
                    ? 'border-black'
                    : 'border-transparent'
                )}
              >
                <Text
                  size="sm"
                  color={
                    isEqual(tab.query, omit(router.query, 'page'))
                      ? 'default'
                      : 'gray'
                  }
                >
                  {tab.title}
                </Text>
              </div>
            </Link>
          ))}
        </nav>
      )}
      {searchable && (
        <div className="flex mb-3 space-x-2">
          <SearchBar
            loading={isLoading}
            onChange={setSearchQuery}
            className="flex-1"
          />
          {actions}
        </div>
      )}
      {isLoading && !results?.data && loading}
      {results?.data &&
        (results?.data[0] || escapedQuery ? (
          <>
            <BulkSelectContext.Provider value={bulkSelectContext}>
              <Table<T> data={results?.data || []} {...props} />
            </BulkSelectContext.Provider>
            {paginated && (
              <Table.Footer
                page={results?.page || 0}
                total={results?.total || 0}
                hasMore={results?.has_more || false}
              />
            )}
          </>
        ) : (
          empty
        ))}
    </div>
  );
};

export default TableLayout;
