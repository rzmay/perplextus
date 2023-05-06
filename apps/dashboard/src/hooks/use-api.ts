'use client';

import React from 'react';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

export default function useAPI<T>(
  endpoint: string | null,
  query: object = {},
  options: SWRConfiguration<T> = {}
): SWRResponse<T> {
  const [results, setResults] = React.useState<T | undefined>(undefined);
  const { data, ...rest } = useSWR<T>(
    [`/api${endpoint}`, JSON.stringify(query)],
    options
  );

  React.useEffect(() => {
    if (data) setResults(data);
  }, [data]);

  return {
    data: results,
    ...rest,
  };
}
