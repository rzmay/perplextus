import md5 from 'md5';
import mongoose from '../../mongoose';
import mongooseCreated from '../../mongoose/plugins/mongoose-created';
import mongooseObjectId from '../../mongoose/plugins/mongoose-object-id';
import generateToken from './methods/generate-token';
import createApiKeys from './middleware/create-api-keys';
import createBucket from './middleware/create-bucket';
import { IUser } from './types';

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    trim: true,
    default(this: IUser) {
      return this.email;
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  avatar: {
    type: String,
    default(this: IUser) {
      return (
        this.email &&
        `https://www.gravatar.com/avatar/${md5(this.email)}?d=retro`
      );
    },
    trim: true,
  },
  last_login: {
    type: Date,
    default: null,
    get: (v?: Date) => v?.getTime() || null,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.virtual('buckets', {
  ref: 'Bucket',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

userSchema.methods.generateToken = generateToken;

userSchema.plugin(mongooseObjectId('usr', 'user'));
userSchema.plugin(mongooseCreated);

userSchema.post('save', createBucket);
userSchema.post('save', createApiKeys);

userSchema.index({ email: 1 }, { unique: true });

export * from './types';
export default mongoose.models.User ||
  mongoose.model<IUser>('User', userSchema);
