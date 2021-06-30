export interface IMessage extends Document {
  title?: string;
  participants: IUser[];
}

export interface IMessageModel extends IMessage, ISharedModel {}
