import mongoose, { Schema } from 'mongoose';
import autoPopulate from 'mongoose-autopopulate';

import { ConversationModel, IMessageModel, UserModel } from 'model';
import FKHelper from '../foreign-key-helper';

const MessageSchema = new Schema<IMessageModel>(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      autopopulate: true,
      required: true,

      validate: [
        {
          validator(v: any) {
            return FKHelper(ConversationModel, v);
          },
          msg: 'Conversation does not exist!',
        },
      ],
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: false,
      required: true,

      validate: [
        {
          validator(v: any) {
            return FKHelper(UserModel, v);
          },
          msg: 'User does not exist!',
        },
      ],
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

MessageSchema.pre('findOneAndUpdate', function () {
  this.setUpdate({ ...this.getUpdate(), updatedAt: new Date() });
});

// TODO: put any cascading delete or relevant logic here, if needed
// MessageSchema.pre('remove', function (next) {});

MessageSchema.methods.toJSON = function () {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
};

MessageSchema.plugin(autoPopulate);

export const MessageModel = mongoose.model<IMessageModel>(
  'Message',
  MessageSchema
);
