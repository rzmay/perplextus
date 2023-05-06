import { IUser } from 'lib/models/user';
import useSWR, { SWRResponse } from 'swr';

export default function useUser(): SWRResponse<IUser> {
  const { data, ...rest } = useSWR(['/api/ajax/auth/user'], {
    shouldRetryOnError: false,
  });

  return {
    data,
    ...rest,
  };
}
