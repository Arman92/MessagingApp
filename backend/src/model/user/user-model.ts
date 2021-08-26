import mongoose, { Schema } from 'mongoose';

import { IUserModel } from './user-type';
import { hashPassword } from '@messaging/utils';

const UserSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: false,
      trim: true,
      lowercase: true,
      index: { unique: true, type: 'string' },
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: { unique: true, type: 'string' },
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre('findOneAndUpdate', function () {
  this.setUpdate({ ...this.getUpdate(), updatedAt: new Date() });
});

UserSchema.pre('save', function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  hashPassword(this.password).then((hashed) => {
    this.password = hashed;
    next();
  });
});

// TODO: put any cascading delete or relevant logic here, if needed
// UserSchema.pre('remove', function (next) {});

// Make necessary changes to be ready to send over api endpoints as JSON
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;

  obj.id = obj._id;
  delete obj._id;

  return obj;
};

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);
