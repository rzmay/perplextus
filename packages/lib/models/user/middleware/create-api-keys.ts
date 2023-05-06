import mongoose from 'lib/mongoose';
import { IUser } from '../types';

export default async function createApiKeys(this: IUser) {
  await mongoose.models.ApiKey.create({
    name: 'Publishable key',
    type: 'publishable',
    user: this.id,
  });

  await mongoose.models.ApiKey.create({
    name: 'Secret key',
    type: 'secret',
    user: this.id,
  });
}
