import React from 'react';

type BulkSelectContextType = {
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  lastSelectedRow?: string;
  setLastSelectedRow: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const BulkSelectContext = React.createContext<BulkSelectContextType | null>(null);

export default BulkSelectContext;
