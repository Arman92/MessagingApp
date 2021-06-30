export interface IConversation extends Document {
  title?: string;
  participants: IUser[];
}

export interface IConversationModel extends IConversation, ISharedModel {}
