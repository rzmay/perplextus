import React from 'react';

export default function useBulkSelect() {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [lastSelectedRow, setLastSelectedRow] = React.useState<string | undefined>(undefined);

  return React.useMemo(
    () => ({
      selectedRows,
      setSelectedRows,
      lastSelectedRow,
      setLastSelectedRow,
    }),
    [selectedRows, lastSelectedRow],
  );
}
