import { IApiKey } from 'lib/models/api-key';
import { IBucket } from 'lib/models/bucket';
import { IFile } from 'lib/models/file';
import { IToken } from 'lib/models/token';
import { IUser } from 'lib/models/user';

type Paginator<T> = (
  filter: object
) => Promise<{ data: T[]; total: number; page: number }>;

type Deleter = () => Promise<void>;

declare module 'mongoose' {
  interface Model<T> {
    paginate: Paginator<T>;
    delete: Deleter;
  }

  interface Models {
    ApiKey: Model<IApiKey>;
    Bucket: Model<IBucket>;
    File: Model<IFile>;
    Token: Model<IToken>;
    User: Model<IUser>;
  }
}
