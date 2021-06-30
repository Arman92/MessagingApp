import mongoose, { Schema } from 'mongoose';

import { UserModel } from 'model/user/user-model';
import FKHelper from '../foreign-key-helper';
import { IConversationModel } from './conversation-type';

const ConversationSchema = new Schema<IConversationModel>(
  {
    title: {
      type: String,
      required: false,
    },
    participants: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      autopopulate: true,
      required: false,

      validate: [
        {
          validator(v: any) {
            return FKHelper(UserModel, v);
          },
          msg: 'Participant (user) does not exist!',
        },
      ],
    },
  },
  { timestamps: true }
);

ConversationSchema.pre('findOneAndUpdate', function () {
  this.setUpdate({ ...this.getUpdate, updatedAt: new Date() });
});

// TODO: put any cascading delete or relevant logic here, if needed
// ConversationSchema.pre('remove', function (next) {});

export const ConversationModel = mongoose.model<IConversationModel>(
  'Conversation',
  ConversationSchema
);
