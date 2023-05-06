import mongoose from 'lib/mongoose';
import { IUser } from '../types';

export default async function createBucket(this: IUser) {
  await mongoose.models.Bucket.create({
    name: 'default',
    location: 'us-west2',
    slug: this.id.split('_')[1].toLowerCase(),
    user: this.id,
  });
}
