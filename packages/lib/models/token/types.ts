import mongoose from '../../mongoose';
import Resource from '../../utils/types/resource';

export type LoginStrategy = 'email' | 'google' | 'invite';
export interface IToken extends Resource {
  user: string;
  strategy: LoginStrategy;
  expires?: Date | number;
  /** @ignore */
  getLoginLink: (redirect: string) => URL;
}

export type TokenDocument = mongoose.Document<string, object, IToken>;
