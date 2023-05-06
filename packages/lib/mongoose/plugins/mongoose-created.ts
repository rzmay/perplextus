import mongoose from 'mongoose';

export default function mongooseCreated(schema: mongoose.Schema) {
  schema.add({
    created: {
      type: Date,
      default: Date.now,
      immutable: true,
      get: (v: Date) => v.getTime(),
    },
  });
}
